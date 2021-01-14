/**
 * @desc 指令 文本超出显示省略号 v-text-clamp:[arg]="value"
 * @param arg  arg 为行数
 * @param value  value为最多显示value个文字
 */
export function clampAuto(el, binding) {
  // console.log("el", el);
  // console.log("binding", binding);
  const { arg: lineNumber = 1, value: maxTextNumber = 0 } = binding;

  const truncate = `
      word-wrap:break-word;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${lineNumber};
    `;
  // eslint-disable-next-line no-control-regex
  const halfText = el.innerText.match(/[\x00-\xff]/g);
  const halfTextNumber = halfText ? halfText.length : 0; //计算半角字体的个数
  const normalTextNumber =
    el.innerText.length - halfTextNumber + halfTextNumber / 2;
  let width = "";
  if (maxTextNumber && maxTextNumber < normalTextNumber) {
    width = `
      width: ${Number(maxTextNumber) + 0.786}em;
    `;
  }
  el.style.cssText += truncate + width;
}

export default {
  install: (app) => app.directive("clampAuto", clampAuto),
  clampAuto,
};

// const truncate = `
//   overflow: hidden;
//   display: -webkit-box;
//   -webkit-line-clamp: ${lineNumber};
//   -webkit-box-orient: vertical;
// `;

// const truncate = `
//     word-wrap:break-word;
//     overflow: hidden;
//     display: -webkit-box;
//     text-overflow: ellipsis;
//     -webkit-box-orient: vertical;
//     -webkit-line-clamp: ${lineNumber};
//   `;
