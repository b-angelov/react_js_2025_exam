
export default function capitalize(string="") {
    if (!string) return "";
    string = string.toString().split(/\s+/);
    string = string.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return string.join(" ");
}