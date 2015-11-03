export function unescapeHTML(str) {
  let div = document.createElement("div");
  div.innerHTML = str.replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/ /g, "&nbsp;")
      .replace(/\r/g, "&#13;")
      .replace(/\n/g, "&#10;");
  return div.textContent || div.innerText;
}

