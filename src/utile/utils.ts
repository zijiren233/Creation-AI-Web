export function stringToNumber(str: string | undefined): number {
  if (str == undefined) {
    return 1;
  }
  const num = parseInt(str);
  return isNaN(num) ? 1 : num;
}

export async function file2Base64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64Str = result.split(",")[1];
      resolve(base64Str);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export function inItems<T>(items: T[], func: (item: T) => boolean): boolean {
  return items.find((item) => func(item)) !== undefined;
}
