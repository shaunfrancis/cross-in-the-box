const constituencyToSlug = (constituency : string) => {
    return constituency.toLowerCase().replace(/ /g, "-").replace(/,|\)|\(/g, "").replace(/ô/g, "o");
};

const slugToLookupSlug = (slug : string) => {
    if(slug == "ynys-mon") return "ynys-môn";
    return slug;
};

export { constituencyToSlug, slugToLookupSlug }