export function replaceLinebreakForBrTag(data: string) {
  return data.replaceAll("\\n", "<br/>");
}
