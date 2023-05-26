import httpInstanse from "@/utile/http";

export function search(
  keywords: string,
  order_type: string,
  page: number,
  time: number
) {
  return httpInstanse({
    url: "search-images",
    params: {
      keywords,
      order_type,
      page,
      time,
      maxcount: true,
      cfg_type: "json",
    },
  });
}
