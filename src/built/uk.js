const Endpoint = "/api";
class CachedDataSkeleton{
static promises = {};
// fallback methods
static fetchArray(){ return new Promise( res => res([]) ); }
static fetchObject(key){
return new Promise( res => {
const obj = {};
obj[key] = [];
res(obj);
} );
}
static parties = [];
static fetchParties(){ return this.fetchArray(); }
static regions = [];
static fetchRegions(){ return this.fetchArray(); }
static results = {};
static fetchResults(_){ return this.fetchObject(_); }
static messages = {};
static fetchMessages(group, path){
return this.downloadProperty(["messages", group], path, {
applyParse: async (response) => {
const text = await response.text();
const json = parseJSONWithDates(text, 'date');
return json;
},
applyTransform: (data) => {
data.sort( (a,b) => {
return (a.pinned != b.pinned) ? (a.pinned || Infinity) - (b.pinned || Infinity) :
(a.date.valueOf() != b.date.valueOf()) ? b.date.valueOf() - a.date.valueOf() : b.id - a.id;
});
}
});
}
static downloadProperty(propertyArray, path, { applyParse, applyTransform = (_) => _ } = {} ){
return new Promise( async resolve => {
const propertyValue = propertyArray.reduce( (obj, key) => {
if(!obj) return null;
else return obj[key];
}, this);

// check if value already exists
if(propertyValue && propertyValue.length !== 0) return resolve(property);
// look in localStorage first (indexedDB?)
// (implement later!!)
// now download
const promiseKey = propertyArray.join("|");
let existingPromise = this.promises[promiseKey];
if(!existingPromise){
existingPromise = fetch(path).then( async res => {
let data;
if(applyParse) data = await applyParse(res);
else data = await res.json();
this.promises[promiseKey]
return data;
});
this.promises[promiseKey] = existingPromise;
}
const data = await existingPromise;
applyTransform(data);
let parent = this;
for(let i = 0; i < propertyArray.length - 1; i++){
if(!parent[propertyArray[i]]) parent[propertyArray[i]] = {};
parent = parent[propertyArray[i]];
}
parent[propertyArray[propertyArray.length - 1]] = data;
// (set in localStorage (indexedDB?) here)
resolve(data);
});
}
};
const DefaultParty = window.DefaultParty = {
id: "?",
displayId: "?",
title: "Missing data",
color: "var(--default-color)"
}
class SearchHandler{
constructor(url, suffix = ""){
this.url = url;
this.suffix = suffix.charAt(0) != "/" ? "/" + suffix : suffix;
this.previousQuery = "";
}
async permission(query){
query = query.trim();
if(query == this.previousQuery) return false;
this.previousQuery = query.trim();
if(query.length <= 2) return false;
await new Promise( sleep => setTimeout(sleep, 500) );
if(query != this.previousQuery) return false;
return true;
}
async search(query){
const permissionToProceed = await this.permission(query);
if(!permissionToProceed) return null;
const response = await fetch(this.url + encodeURIComponent(query) + this.suffix).then( res => res.json() );
if(query.trim() != this.previousQuery) return null;
return response;
}
}
const parseJSONWithDates = (text, keys) => {
if(typeof keys === "string") keys = [keys];
return JSON.parse(text, (key, value) => {
if(keys.includes(key)) return new Date(value);
return value;
});
}
/* Duplicated in lib/shared.php */
const dateToLongDate = (date, includeYear = date.getFullYear() !== (new Date()).getFullYear()) => {
let ordinalIndicator = "th";
if(![11,12,13].includes(date.getDate())) switch(date.getDate() % 10){
case 1: ordinalIndicator = "st"; break;
case 2: ordinalIndicator = "nd"; break;
case 3: ordinalIndicator = "rd";
}
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"][date.getMonth()];
let longDate = date.getDate().toString() + ordinalIndicator + " " + month;
if(includeYear) longDate += " " + date.getFullYear();
return longDate;
}
import Message from "components/shared/Message/Message";
class ElectionResultContainer{
static observer;
static elementMaps = new WeakMap();
constructor(elt, MapClass){
this.structure = this.hydrate(elt);
this.winFormulaName = this.structure.container.getAttribute('data-win-formula');
this.data = {
election: this.structure.container.getAttribute('data-election'),
regionsType: this.structure.container.getAttribute('data-regions-type'),
updates: [],
};
this.attributes = {
messageGroup: this.structure.messages.container?.getAttribute('data-group'),
showChanges: this.structure.container.getAttribute('data-show-changes')
};
this.structure.container.removeAttribute('data-election');
this.structure.container.removeAttribute('data-regions-type');
Toggle.register('map-type', (bool) => {
const map = this.maps.find(map =>
map.type === (bool ? "geographic" : "cartographic")
);
if(map) map.show();
});
this.maps = (this.structure.maps.types).map(container => {
const instance = new MapClass(container, this, { election: this.data.election, type: container.getAttribute('data-map-type'), src: container.getAttribute('data-src') });
container.removeAttribute('data-map-type');
container.removeAttribute('data-src');
return instance;
});
this.constructor.elementMaps.set(this.structure.container, this);
if(!this.constructor.observer) this.constructor.observer = new IntersectionObserver( (entries, observer) => {
entries.forEach( async entry => {
if(entry.isIntersecting){
observer.unobserve(entry.target);
const instance = ElectionResultContainer.elementMaps.get(entry.target);
if(instance){
ElectionResultContainer.elementMaps.delete(entry.target);
await instance.downloadData(instance.data, instance.attributes);
instance.addSummary();
instance.updateMap();
if(CachedData.messages[instance.attributes.messageGroup]) instance.addMessages();
}
}
});
});

this.constructor.observer.observe(this.structure.container);
}
get visibleMap(){
return this.maps.find(map => map.visible) || this.maps[0];
}
fillMap(data){
this.currentFillData = data;
this.visibleMap.fill(data);
}
hydrate(elt){
// Toggle messages
const messagesContainer = elt.querySelector('.ElectionResultContainer__messages-container');
const toggleMessagesButton = elt.querySelector('.ElectionResultContainer__messages-button');
if(messagesContainer && toggleMessagesButton){
toggleMessagesButton.addEventListener('click', () => {
messagesContainer.classList.toggle('visible');
});
}
return {
container: elt,
hoverPopup: elt.querySelector('.ElectionResultContainer__hover-popup'),
messages: {
container: messagesContainer,
innerContainer: messagesContainer?.querySelector('.ElectionResultContainer__messages-inner-container'),
toggleButton: toggleMessagesButton,
},
summary: {
container: elt.querySelector('.ElectionResultContainer__summary-container'),
},
maps: {
container: elt.querySelector('.ElectionResultContainer__map-container'),
types: [...elt.querySelectorAll('.ElectionResultContainer__map-container > div')]
}
}
}
async downloadData({ election, regionsType = null }, { messageGroup, showChanges }){
if(CachedData.parties.length === 0) await CachedData.fetchParties();
if(CachedData.regions.length === 0) await CachedData.fetchRegions(regionsType);
if(!CachedData.results[election]) await CachedData.fetchResults(election);
if(showChanges){
this.data.updates = await fetch(Endpoint + "/updates/uk/" + election)
.then( res => res.text() )
.then( res => parseJSONWithDates(res, "date") );
this.data.updates.sort( (a,b) => a.date.valueOf() - b.date.valueOf() );
}
if(messageGroup && !CachedData.messages[messageGroup]) await CachedData.fetchMessages(messageGroup);
}
winFormula(results){
switch(this.winFormulaName){
case "second-place": { // parties in second place
const regionResults = [];
results.forEach(result => {
if(!(result.id in regionResults)){
regionResults[result.id] = { largest: result, secondLargest: {votes: -Infinity}, count: 1 }
}
else{
if(result.votes > regionResults[result.id].largest.votes){
regionResults[result.id].secondLargest = regionResults[result.id].largest;
regionResults[result.id].largest = result;
}
else if(result.votes > regionResults[result.id].secondLargest.votes){
regionResults[result.id].secondLargest = result;
}
regionResults[result.id].count++;
}
});
return regionResults.filter( regionResult => regionResult.count > 1).map( regionResult => regionResult.secondLargest );
}
default: // any elected
return results.filter(result => result.elected);
}
}
addSummary(){}
updateMap(showChanges = false){
const newFills = []; // {id: string, color: string, opacity?: number}[]
this.winFormula(CachedData.results[this.data.election]).forEach( result => {
const regionUpdates = this.data.updates.filter( u => u.id == result.id );
if(regionUpdates.length > 0){
const latestUpdate = regionUpdates[regionUpdates.length - 1];
const party = CachedData.parties.find( p => p.id == latestUpdate.party ) || DefaultParty;
if(party) newFills.push({ id: latestUpdate.id, color: party.color || "var(--default-color)" });
}
else{
const party = CachedData.parties.find( p => p.id == result.party ) || DefaultParty;
if(party) newFills.push({
id: result.id,
color: party.color || "var(--default-color)",
opacity: showChanges ? 0.2 : undefined
});
}
});

this.fillMap({ regions: CachedData.regions, fills: newFills });
}
addMessages({
dateFun,
timezoneArgs = {},
urlFun = (slug, type) => "#",
childrenFun
}){
if(!dateFun) dateFun = (date) => {
if(timezoneArgs.localeStringArgs) date = new Date(date.toLocaleString(...timezoneArgs.localeStringArgs));
let time = date.getHours().toString().padStart(2,'0') + ":" + date.getMinutes().toString().padStart(2,'0');
const dayWord = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()];
let dateString = dayWord + " " + dateToLongDate(date) + ", " + time;
if(timezoneArgs.localeLabel) dateString += ` <span style="font-size:0.8em">${timezoneArgs.localeLabel}</span>`;
return dateString;
};

const injectLinks = (text) => {
const spans = [];
text.split("#").forEach( (link, index) => {
if(link == "") return;

if(index % 2){
let [_, type, slug, displayText] = ["", "", link, link];
if(link.includes("@")) [_ = "", type = "", slug = "", displayText = ""] = link.split("@");

const span = new Elt({
tag: 'a',
classList: ["interactive", "unstyled"],
href: urlFun(slug, type),
innerHTML: displayText
});
spans.push(span);
}
else spans.push( new Elt({ tag: 'span', innerHTML: link }) );
});
return spans;
}
CachedData.messages[this.attributes.messageGroup].forEach(message => {
const square = message.square ? (CachedData.parties.find(p => p.id == message.square) || DefaultParty) : null;
const oldSquare = message.old_square ? (CachedData.parties.find(p => p.id == message.old_square) || DefaultParty) : null;
const children = childrenFun ? [...injectLinks(message.text), ...childrenFun(message)] : injectLinks(message.text);
this.structure.messages.innerContainer.appendChild( Message.render({
date: dateFun(message.date),
noHeader: message.no_header,
oldSquare: oldSquare,
square: square,
children: children
}) );
});
this.structure.messages.container.classList.remove('loading');
}
}
window.addEventListener('DOMContentLoaded', () => {
for(const item of document.getElementsByClassName('HeroNav__item')){
const section = document.getElementById(item.getAttribute('data-id'));
if(section) item.addEventListener('click', () => {
section.scrollIntoView({behavior: "smooth"});
});
const focusSelector = item.getAttribute('data-focus');
if(focusSelector) item.addEventListener('click', () => {
document.querySelector(focusSelector)?.focus();
});
}
});
class Map{
static instances = [];

constructor(container, containerInstance, {election, type, src}){
Map.instances.push(this);
this.structure = {container: container};
this.containerInstance = containerInstance;
this.election = election;
this.type = type;
this.src = src;
this.downloaded = this.structure.container.innerHTML !== "";
this.downloadParameters = {};
if(!this.downloaded){
this.downloadParameters.src = this.structure.container.getAttribute('data-src');
}
}
get visible(){ return this.structure.container.checkVisibility() }
fill({
regions,                                    // list of regions to loop through
// Region[]
regionSelector = (id) => `[name="${id}"]`,  // querySelector for regions on map; defaults to name attribute
// (any, ...) => string
fills = [],                                 // list of fills to apply to given region ids
// ?{id : string, color : string, opacity? : number}[]
hoverFun = (active, popup, id) => {},       // optional function to execute on hover of regions
// ?(active : boolean, popup : HTMLDivElement, id?: string) => void
clickFun = (id) => {}                       // optional function to execute on click of regions
// ?(id?: string) => void
}){
this.currentFill = this.containerInstance.currentFillData;
regions.map( region => {
let fill = fills.find(f => f.id == region.id);
if(!fill) fill = {id: region.id, color: "#EEE"};
const regionElts = this.structure.container.querySelectorAll( regionSelector(region.id) );
if(regionElts.length === 0) return;
regionElts.forEach(regionElt => {
regionElt.setAttribute('fill', fill.color);
regionElt.setAttribute('style', fill.opacity !== undefined ? "opacity:" + fill.opacity : "");

regionElt.removeEventListener('mouseover', this.mouseover);
regionElt.addEventListener('mouseover', this.mouseover = (event) => {
const popup = this.containerInstance.structure.hoverPopup;
hoverFun(true, popup, region.id);
});
regionElt.removeEventListener('mousemove', this.mousemove);
regionElt.addEventListener('mousemove', this.mousemove = (event) => {
const popup = this.containerInstance.structure.hoverPopup;
const coordinates = [event.clientX, event.clientY];
const width = popup.offsetWidth;
const height = popup.offsetHeight;
const offsets = [0,0];
if(coordinates[0] + 20 + width > window.innerWidth) offsets[0] = -(width + 40);
if(coordinates[1] + 20 + height > window.innerHeight) offsets[1] = window.innerHeight - height - 20 - coordinates[1];
popup.style.left = coordinates[0] + offsets[0] + 20 + "px";
popup.style.top = coordinates[1] + offsets[1] + 20 + "px";
popup.classList.remove('hidden');
});
regionElt.removeEventListener('mouseout', this.mouseout);
regionElt.addEventListener('mouseout', this.mouseout = () => {
const popup = this.containerInstance.structure.hoverPopup;
popup.classList.add('hidden');
hoverFun(false, popup);
});
regionElt.removeEventListener('click', this.click);
regionElt.addEventListener('click', this.click = () => {
clickFun(region.id);
});
});
});
}
async show(){
this.containerInstance.maps.forEach(map => { if(map !== this) map.hide() });

if(!this.downloaded) await this.download();
this.structure.container.classList.remove('hidden');
// If fill data has changed, refill
if(this.containerInstance.currentFillData && this.currentFill != this.containerInstance.currentFillData){
this.fill(this.containerInstance.currentFillData);
}
}
hide(){
this.structure.container.classList.add('hidden');
}
async download(){
this.downloaded = true;
await fetch('/' + this.downloadParameters.src).then( response => response.text() ).then( svgText => {
this.structure.container.innerHTML = svgText;
});
if(this.containerInstance.currentFillData){
this.fill(this.containerInstance.currentFillData);
}
}
}
window.addEventListener('DOMContentLoaded', async () => {
if(CachedData.parties.length === 0) await CachedData.fetchParties();
for(const container of document.querySelectorAll('.RegionBarGraph')){
for(const row of container.querySelectorAll('.RegionBarGraph__row')){
const partyId = row.getAttribute('data-party');
const blocs = {
party: row.querySelector('.RegionBarGraph__party'),
candidate: row.querySelector('.RegionBarGraph__candidate'),
votes: row.querySelector('.RegionBarGraph__votes'),
percentage: row.querySelector('.RegionBarGraph__percentage'),
bar: row.querySelector('.RegionBarGraph__bar'),
};
let party = CachedData.parties.find( p => p.id === partyId );
if(!party) party = DefaultParty;
Object.values(blocs).forEach( elt => {
elt.style.background = party.color || "var(--default-color)";
if(party.textColor) elt.style.color = party.textColor;
});
blocs.party.querySelector('span').innerHTML = party.displayId;
row.querySelector('.RegionBarGraph__hover').innerHTML = party.title;
}
container.classList.remove('pre-hydration');
}
});
window.addEventListener('DOMContentLoaded', async () => {
if(CachedData.parties.length === 0) await CachedData.fetchParties();
for(const container of document.querySelectorAll('.RegionPage')){
for(const bloc of container.querySelectorAll('.RegionPage__party-bloc')){
const partyId = bloc.getAttribute('data-party');
let party = CachedData.parties.find( p => p.id === partyId );
if(!party) party = DefaultParty;

bloc.style.background = party.color || "var(--default-color)";
if(party.textColor) bloc.style.color = party.textColor;
bloc.innerHTML = party.displayId;
}
container.classList.remove('pre-hydration');
}
});
import Elt from 'components/shared/_Elt/_Elt';
class RegionSearchSection{
constructor(elt, path, pathSuffix = null){
this.structure = this.hydrate(elt);
this.handler = new RegionSearchHandler(path, pathSuffix);
}
hydrate(elt){
const input = elt.querySelector('.RegionSearchSection__search-input');
input.addEventListener('mouseup', (event) => {
event.target.setSelectionRange(0, event.target.value.length);
});
return {
container: elt,
search: {
container: elt.querySelector('.RegionSearchSection__search-container'),
input: input,
},
status: {
container: elt.querySelector('.RegionSearchSection__status-container'),
},
results: {
container: elt.querySelector('.RegionSearchSection__results-container'),
},
};
}
set status(message){
this.structure.status.container.innerHTML = message;
}
async search(query){
if(query.length >= 3) this.status = "Searching&hellip;";
else this.status = "";

const searchResults = await this.handler.search(query);

if(searchResults && searchResults.regions.length + searchResults.candidates.length == 0) this.status = "No results found.";
else this.status = "";
if(!searchResults && query.trim().length < 3) this.structure.results.container.innerHTML = "";
return searchResults;
}
addResults(
{ regions, candidates },
query,
{ resultsHref = (region) => "#", abolishedLabel = "Abolished", candidateLabel = "candidate", winnerLabel = "winner" },
start = 0
){
const highlightRelevance = (query, title) => {
const words = query.split(/ |-|—/g);
words.sort( (a,b) => b.length - a.length );

let regexPattern = "(";
words.forEach( (word, index) => {
regexPattern += (index == 0 ? "" : "|") + word.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
})
regexPattern += ")";
const spans = [];
const accentInsensitiveTitle = title.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
let index = 0;
accentInsensitiveTitle.split( new RegExp(regexPattern, "gi") ).forEach( (fragment, key) => {
if(fragment != ""){
const accentedFragment = title.substring(index, index + fragment.length);
index += fragment.length;
spans.push(
new Elt({ tag: 'span', style: key % 2 ? {} : { color: "#666" }, innerHTML: accentedFragment })
);
}
});

return spans;
};
if(start === 0) this.structure.results.container.innerHTML = "";
for(let index = start; index < regions.length + candidates.length; index++){
if(index >= start + 15){
const moreButton = this.structure.results.container.appendChild(
new Elt({
tag: 'button',
classList: ["RegionSearchSection__load-button", "button"],
innerHTML: "Show more"
})
);
moreButton.addEventListener('click', () => {
moreButton.remove();
this.addResults(
{ regions, candidates },
query,
{ resultsHref, abolishedLabel, candidateLabel, winnerLabel },
start + 15
);
});
break;
}
const region = [...regions, ...candidates][index];
const a = new Elt({
tag: 'a',
href: resultsHref(region),
classList: ["RegionSearchSection__result", "unstyled"],
});

if(index < regions.length){ // region
a.append(...[
new Elt({
tag: 'h2',
classList: ["RegionSearchSection__result-title"],
children: highlightRelevance(query, region.title)
}),
!region.current ? new Elt({ tag: 'span', style: { color: "#666" }, innerHTML: abolishedLabel}) : null
].filter(Boolean));
}
else{ // candidate region
a.append(...[
new Elt({
tag: 'h2', classList: ["RegionSearchSection__result-title"], children: [
new Elt({
tag: 'div',
classList: ["RegionSearchSection__title-bloc"],
style: {background: region.party.color || "var(--default-color)", color: region.party.textColor}, innerHTML: partyIdToDisplayId(region.party.id)
}),
...highlightRelevance(query, region.candidate)
]
}),
new Elt({
tag: 'span',
style: { color: "#666" },
innerHTML: region.title + " " + (region.elected ? winnerLabel : candidateLabel) + ", " + region.election.join(" ")
})
]);
}
this.structure.results.container.append(a);
};
}
}
class RegionSearchHandler extends SearchHandler{
constructor(url, suffix = ""){
super(url, suffix);
}
async search(query){
const results = await super.search(query);
if(results){
const precedence = (result) => {
const words = query.split(/ |-|—/g);
words.sort( (a,b) => b.length - a.length );

let regexPattern = "(";
words.forEach( (word, index) => {
regexPattern += (index == 0 ? "" : "|") + word.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
})
regexPattern += ")";
let intersections = 0;
result
.normalize("NFD")
.replace(/[\u0300-\u036f]/g, '')
.split( new RegExp(regexPattern, "gi") )
.forEach( (fragment, index) => {
if(index % 2) intersections += fragment.length;
}
);

return intersections;
};
results.regions.sort( (a, b) =>  precedence(b.title) - precedence(a.title) );
results.candidates.sort( (a, b) =>  {
return (precedence(b.candidate) + (b.elected ? 1000 : 0) - precedence(a.candidate) - (a.elected ? 1000 : 0));
});
}
return results;
}
}
class Toggle{
static register(id, fun){
const toggles = document.querySelectorAll('.Toggle[data-id="' + id + '"]');
let state = false;
for(const toggle of toggles){
const inner = (elt) => elt.querySelector('.Toggle__inner');
const outer = (elt) => elt.querySelector('.Toggle__outer');
if(inner(toggle) && outer(toggle)) outer(toggle).addEventListener('click', () => {
state = !state;
toggles.forEach( t => inner(t).classList.toggle('Toggle__toggled') );
fun(state);
});
const off = toggle.querySelector('.Toggle__off');
if(off) off.addEventListener('click', () => {
state = false;
toggles.forEach( t => inner(t).classList.remove('Toggle__toggled') );
fun(false);
});
const on = toggle.querySelector('.Toggle__on');
if(on) on.addEventListener('click', () => {
state = true;
toggles.forEach( t => inner(t).classList.add('Toggle__toggled') );
fun(true);
});

}
}
}

class CachedData extends CachedDataSkeleton{
static fetchParties(){
return this.downloadProperty(["parties"], Endpoint + "/parties/uk", {
applyTransform: (data) => {
data.forEach( party => party.displayId = partyIdToDisplayId(party.id) );
}
});
}
static fetchRegions(type = null){ return this.downloadProperty( ["regions"], Endpoint + "/regions/uk/" + (type || "") ) }
static fetchResults(election){ return this.downloadProperty(["results", election], Endpoint + "/results/uk/" + election) }
static fetchMessages(group, path = Endpoint + "/messages/uk/" + group){ return super.fetchMessages(group, path) }
}
const partyIdToDisplayId = (partyId) => {
let displayId = partyId.toUpperCase();
if(["speaker","vacant"].includes(partyId)) displayId = partyId.charAt(0).toUpperCase() + partyId.slice(1);
else if(displayId.startsWith("IND_")) displayId = displayId.substring(4);
return displayId;
}
/* Duplicated in lib/uk.php */
const regionToSlug = (title) => {
return title.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "").replace(/ô/g, "o");
};
window.addEventListener('DOMContentLoaded', async () => {
if(CachedData.parties.length === 0) await CachedData.fetchParties();
for(const container of document.querySelectorAll('.DHondtTable')){
for(const row of container.querySelectorAll('.DHondtTable__row')){
const partyId = row.getAttribute('data-party');
const partyBloc = row.querySelector('.DHondtTable__party');
if(!partyBloc) continue;
const blocs = [partyBloc, ...row.querySelectorAll('.DHondtTable__elected')];

let party = CachedData.parties.find( p => p.id === partyId );
if(!party) party = DefaultParty;
blocs.forEach( bloc => {
bloc.style.background = party.color || "var(--default-color)";
if(party.textColor) bloc.style.color = party.textColor;
});

if(partyBloc) partyBloc.querySelector('span').innerHTML = party.displayId;
row.querySelector('.DHondtTable__hover').innerHTML = party.title;
}
container.classList.remove('pre-hydration');
}
});
window.addEventListener('DOMContentLoaded', () => {
const instances = [];
for(const elt of document.querySelectorAll('.ElectionResultContainer')){
switch(elt.getAttribute('data-regions-type')){
case "scotland":
instances.push(new UKScotlandElectionResultContainer(elt));
break;
case "general": default:
instances.push(new UKGeneralElectionResultContainer(elt));
}
}
});
class UKElectionResultContainer extends ElectionResultContainer{
addMessages(options){
const urlFun = (slug, type) => {
let url = "/uk/";
switch(type){
case "general": url += "general-elections/"; break;
default: url += "general-elections/"
}
url += 'constituency/' + regionToSlug(slug);
return url;
}
super.addMessages({ urlFun: urlFun, ...options });
}
}
import ElectionSummaryBlocs from 'components/shared/ElectionSummaryBlocs/ElectionSummaryBlocs';
import PartyProgressionBlocs from 'components/shared/PartyProgressionBlocs/PartyProgressionBlocs';
import PopupBarGraph from 'components/shared/PopupBarGraph/PopupBarGraph';
class UKGeneralElectionResultContainer extends UKElectionResultContainer{
constructor(elt){
super(elt, UKGeneral);
}
winFormula(results){
switch(this.winFormulaName){
case "con-ref-combined": {
CachedData.parties.push({
id: "custom_conref",
displayId: "BLUE",
color: "#089CD7"
});
let regionResults = [];
results.forEach(result => {
if(!(result.id in regionResults)) regionResults[result.id] = {results: [], con: 0, ref: 0};
if(["con","ref"].includes(result.party)){
regionResults[result.id][result.party] = result.votes;
}
else regionResults[result.id].results.push(result);
});
regionResults = regionResults.map( regionResult => {
const results = regionResult.results;
results.push({ id: regionResult.results[0].id, party: "custom_conref", votes: regionResult.con + regionResult.ref });
return results;
});
const winners = [];
Object.values(regionResults).forEach( regionResult => {
winners.push(
regionResult.reduce( (max, result) => {
return result.votes > max.votes ? result : max;
})
);
});

return winners;
}
default:
return super.winFormula(results);
}
}
addSummary(){
const summaries = []; // {party : Party, count : number}[]
this.winFormula(CachedData.results[this.data.election]).forEach( result => {

const regionUpdates = this.data.updates.filter( update => update.id == result.id );
const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;
if(!summaries.find( summary => summary.party.id == winner)){
const party = CachedData.parties.find( party => party.id === result.party) || DefaultParty;
summaries.push({ party: party, count: 1 });
}
else summaries.find( summary => summary.party.id == winner ).count++;
});
summaries.sort( (a,b) => {
const getCount = (x) => {
return (["vacant","speaker","ind"].includes(x.party.id)) ? -Infinity : x.count;
}
return getCount(b) - getCount(a) || a.party.id.localeCompare(b.party.id);
} );

this.structure.summary.container.appendChild(
ElectionSummaryBlocs.render({ data: summaries, rowLength: 5 })
);
}
fillMap(data){
data.clickFun = (id) => {
let region = CachedData.regions.find( r => r.id == id );
if(region) window.location.href = '/uk/general-elections/constituency/' + regionToSlug(region.title);
}
data.hoverFun = (active, popup, id) => {
if(!active) return;
popup.innerHTML = "";
const region = CachedData.regions.find( region => region.id == id );
const regionResults = CachedData.results[this.data.election]
.filter( result => result.id == id )
.sort( (a,b) => b.votes - a.votes );
const regionUpdates = this.data.updates.filter( update => update.id == region.id );
// Title
if(!region) return popup.appendChild( new Elt({tag: 'h3', innerHTML: "Missing data"}) );
popup.appendChild( new Elt({tag: 'h3', innerHTML: region.title}) );
// Winning candidate
const winner = this.winFormula(regionResults)[0];
let innerHTML = winner?.candidate;
if(this.winFormulaName === "second-place") innerHTML += " in second place";
if(winner) popup.appendChild( new Elt({tag: 'h4', innerHTML: innerHTML}) );
// Party progression blocs
const partyProgression = [CachedData.parties.find( party => party.id === winner?.party ) || DefaultParty];
regionUpdates.forEach( update => {
partyProgression.push( CachedData.parties.find( party => party.id == update.party ) || DefaultParty );
});
if(partyProgression.length > 1) popup.appendChild( PartyProgressionBlocs.render({ parties: partyProgression }) );
// Bar graph
popup.appendChild( PopupBarGraph.render({ results: regionResults, parties: CachedData.parties }) );
};
super.fillMap(data);
}
addMessages(){
const childrenFun = (message) => {
let messageResults = [];
if(message.results) switch(message.result_type){
case 1: //exit poll
messageResults.push( PopupBarGraph.render({
results: message.results.sort( (a,b) => b.votes - a.votes ),
parties: CachedData.parties,
goal: 326/650,
format: "n",
title: message.link_title
}) );
break;
default:
let hardcodeTitle = null;
if(message.date.getFullYear() == 2024 && !message.link_title) hardcodeTitle = "Partial results";
messageResults.push( PopupBarGraph.render({
results: message.results.sort( (a,b) => b.votes - a.votes ),
parties: CachedData.parties,
title: hardcodeTitle ?? message.link_title
}) );
}
return messageResults;
}
super.addMessages({ childrenFun: childrenFun });
}
}
class UKScotlandElectionResultContainer extends UKElectionResultContainer{
constructor(elt){
super(elt, UKScotland);
}
addSummary(){
const summaries = []; // {party : Party, count : number}[]
this.winFormula(CachedData.results[this.data.election]).forEach( result => {

const regionUpdates = this.data.updates.filter( update => update.id == result.id );
const winner = regionUpdates.length > 0 ? regionUpdates[regionUpdates.length - 1].party : result.party;
if(!summaries.find( summary => summary.party.id == winner)){
const party = CachedData.parties.find( party => party.id === result.party) || DefaultParty;
summaries.push({ party: party, count: 1 });
}
else summaries.find( summary => summary.party.id == winner ).count++;
});
summaries.sort( (a,b) => {
const getCount = (x) => {
return (["vacant","ind"].includes(x.party.id)) ? -Infinity : x.count;
}
return getCount(b) - getCount(a) || a.party.id.localeCompare(b.party.id);
} );

this.structure.summary.container.appendChild(
ElectionSummaryBlocs.render({ data: summaries, rowLength: 5 })
);
}
fillMap(data){
data.clickFun = (id) => {
let region = CachedData.regions.find( r => r.id == id );
if(region) window.location.href = '/uk/scottish-parliament/constituency/' + regionToSlug(region.title);
}
data.hoverFun = (active, popup, id) => {
if(!active) return;
popup.innerHTML = "";
const region = CachedData.regions.find( region => region.id == id );
const regionResults = CachedData.results[this.data.election]
.filter( result => result.id == id )
.sort( (a,b) => b.votes - a.votes );
const regionUpdates = this.data.updates.filter( update => update.id == region.id );
// Title
if(!region) return popup.appendChild( new Elt({tag: 'h3', innerHTML: "Missing data"}) );
popup.appendChild( new Elt({tag: 'h3', innerHTML: region.title}) );
// Winning candidate
const winner = this.winFormula(regionResults)[0];
let innerHTML = winner?.candidate;
if(this.winFormulaName === "second-place") innerHTML += " in second place";
if(winner) popup.appendChild( new Elt({tag: 'h4', innerHTML: innerHTML}) );
// Party progression blocs
const partyProgression = [CachedData.parties.find( party => party.id === winner?.party ) || DefaultParty];
regionUpdates.forEach( update => {
partyProgression.push( CachedData.parties.find( party => party.id == update.party ) || DefaultParty );
});
if(partyProgression.length > 1) popup.appendChild( PartyProgressionBlocs.render({ parties: partyProgression }) );
// Bar graph
popup.appendChild( PopupBarGraph.render({ results: regionResults, parties: CachedData.parties }) );
};
super.fillMap(data);
}
addMessages(){
const childrenFun = (message) => {
let messageResults = [];
if(message.results) switch(message.result_type){
case 1: //exit poll
messageResults.push( PopupBarGraph.render({
results: message.results.sort( (a,b) => b.votes - a.votes ),
parties: CachedData.parties,
goal: 326/650,
format: "n",
title: message.link_title
}) );
break;
default:
let hardcodeTitle = null;
if(message.date.getFullYear() == 2024 && !message.link_title) hardcodeTitle = "Partial results";
messageResults.push( PopupBarGraph.render({
results: message.results.sort( (a,b) => b.votes - a.votes ),
parties: CachedData.parties,
title: hardcodeTitle ?? message.link_title
}) );
}
return messageResults;
}
super.addMessages({ childrenFun: childrenFun });
}
}
class UKGeneral extends Map{
constructor(container, containerInstance, {election, type, src}){
super(container, containerInstance, {election, type, src});
}
async download(){
await (super.download.bind(this))();
if(this.type === "geographic"){
const attribution = this.structure.container.appendChild( document.createElement('p') );
attribution.classList.add('Map__attribution');
switch(this.src){
case "public/maps/UK-2024-geographic.svg":
attribution.innerHTML = 'Adapted from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:UK_House_of_Commons_constituencies_2023.svg">File:UK House of Commons constituencies 2023.svg</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license. Contains public sector information licensed under the <a target="_blank" href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0.</a>';
break;
case "public/maps/UK-2010-geographic.svg":
attribution.innerHTML = 'Adapted from <a target="_blank" href="https://commons.wikimedia.org/wiki/File:2017UKElectionMap.svg">File:2017UKElectionMap.svg</a>. Licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/deed.en">Creative Commons Attribution-Share Alike 4.0 International</a> license.';
break;
}
}
}
}
class UKScotland extends Map{
constructor(container, containerInstance, {election, type, src}){
super(container, containerInstance, {election, type, src});
}
}
window.addEventListener('DOMContentLoaded', () => {
const instances = [];
for(const elt of document.querySelectorAll('.RegionSearchSection')){
switch(elt.getAttribute('data-type')){
case "scotland":
instances.push( new ScotlandRegionSearchSection(elt) );
break;
case "general": default:
instances.push( new GeneralRegionSearchSection(elt) );
}
}
});
class GeneralRegionSearchSection extends RegionSearchSection{
constructor(elt, path = Endpoint + "/search/uk/"){
super(elt, path, "general");
this.structure.search.input.addEventListener('input', async (event) => {
const query = event.target.value;
const searchResults = await this.search(query);
if(searchResults) this.addResults(searchResults, query, {
resultsHref: (region) => '/uk/general-elections/constituency/' + regionToSlug(region.title),
abolishedLabel: "Abolished constituency",
winnerLabel: "MP"
});
});
}
}
class ScotlandRegionSearchSection extends RegionSearchSection{
constructor(elt, path = Endpoint + "/search/uk/"){
super(elt, path, "scotland");
this.structure.search.input.addEventListener('input', async (event) => {
const query = event.target.value;
const searchResults = await this.search(query);
if(searchResults) this.addResults(searchResults, query, {
resultsHref: (region) => '/uk/scottish-parliament/constituency/' + regionToSlug(region.title),
abolishedLabel: "Abolished constituency",
winnerLabel: "MSP"
});
});
}
}

