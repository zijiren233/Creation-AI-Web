import httpInstanse from "@/utile/http";

export function getModes() {
  return httpInstanse({
    url: "modes",
  });
}

export function getModels() {
  return httpInstanse({
    url: "models",
  });
}

export function getExtraModelGroups() {
  return httpInstanse({
    url: "/extra-model-groups",
  });
}

export function getExtraModelsWithGroup(group: string) {
  return httpInstanse({
    url: "/extra-model-groups/" + group,
  });
}

interface Auth {
  username: string;
  password: string;
}

export function drawPost(config: string, auth: Auth) {
  return httpInstanse({
    url: "/draw",
    method: "post",
    data: config,
    auth,
    headers: { "Content-Type": "application/json" },
  });
}

export function drawGet(auth: Auth) {
  return httpInstanse({
    url: "/draw",
    auth,
  });
}
