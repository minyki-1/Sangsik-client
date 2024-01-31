export const makeDetail = (contents: string) => {
  const withLineBreaks = contents
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>|<\/div>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  const parser = new DOMParser();
  const doc = parser.parseFromString(withLineBreaks, "text/html");
  const result = doc.body.textContent
    ?.split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
  return result;
};

export const makeDescription = (contents: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(contents, "text/html");
  const paragraphs = doc.querySelectorAll("p");
  for (const [_, paragraph] of paragraphs.entries()) {
    const textContent = paragraph.textContent || "";
    if (textContent.trim().length > 0) {
      return textContent.trim();
    }
  }
  return "";
};

export const getPreviewImage = (contents: string) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = contents;

  const firstImage = tempDiv.querySelector("img");

  return firstImage?.src;
};
