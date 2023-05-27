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

export function getCtrlPreprocess() {
  return httpInstanse({
    url: "control-preprocess",
  });
}

export function getCtrlProcess() {
  return httpInstanse({
    url: "control-process",
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

export function drawPost(config: string) {
  return httpInstanse({
    url: "/draw",
    method: "post",
    data: config,
    headers: { "Content-Type": "application/json" },
  });
}

export function drawGet() {
  return httpInstanse({
    url: "/draw",
  });
}
