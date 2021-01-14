import { isArray, isObject } from "@/utils/index";
/**
 * @desc 请求辅助函数
 */
export function mapRequest(
  arr,
  { keyName = "key", valueName = "value", request } = {}
) {
  return arr.reduce(
    (
      obj,
      { [keyName]: key, [valueName]: value, params: p = {}, options: o = {} }
    ) => {
      obj[key] = (params = {}, options = {}) =>
        request(value, { ...p, ...params }, { ...o, ...options });
      return obj;
    },
    {}
  );
}

/**
 * @desc 文件转FormData
 * @param {*} fileObj
 */
export function fileToFormData(fileObj) {
  if (!isObject(fileObj)) {
    return new Error("传入的文件不是对象格式");
  }
  const key = Object.keys(fileObj)[0];
  const value = fileObj[key];
  if (!value) {
    return new Error("传入的文件对象值键名所对应的值不能为空");
  }
  const formData = new FormData();
  if (isArray(value)) {
    value.forEach(file => {
      formData.append(key, file);
    });
  } else {
    formData.append(key, value);
  }
  return formData;
}

/**
 * @desc axios 适配器
 */
// export * as requestAdapter from "axios-apicloud-adapter";
// export * as requestAdapter from "axios-adapter-uniapp";
export const requestAdapter = null;
