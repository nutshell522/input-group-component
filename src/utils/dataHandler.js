/*
 *  加上千分位符號
 *  @param num - ex: -7855948.9527
 *  @return - ex: -7,855,948.9527
 */
export const addComma = (num) => {
  // 將數字以小數點分割
  const [integer, decimal] = num.toString().split('.');

  /**
   * 正規表達式: /\B(?=(\d{3})+(?!\d))/g
   * 簡述:
   * \B : 非單詞邊界，避免在數字開頭添加逗號。
   * (?=...) : 正向先行斷言，確保每組三位數後可以插入逗號。
   * (\d{3}) : 匹配三位數字組。
   * + : 匹配多組三位數。
   * (?!\d) : 負向先行斷言，避免在最後一位數後插入逗號。
   * g : 全局匹配，應用於整個字串。
   */
  const int = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return decimal ? `${int}.${decimal}` : int;
};

/*
 *  找出數字 0 到 20 間重疊與未包含的數字區間
 *  @param rangeList - [[6, 11], [5, 8], [17, 20], [7, 7], [14,17]]
 *  @return - output: { overlap: [[6, 8], [17, 17]], notInclude: [[0, 4], [12, 13]] }
 */
export const getNumberIntervals = (rangeList) => {
  // 如果區間列表為空，則返回 0 到 20 的未包含區間
  if (rangeList.length === 0 || rangeList[0].length === 0) {
    return { overlap: [], notInclude: [[0, 20]] };
  }

  // 將區間根據起點進行排序
  rangeList.sort((a, b) => a[0] - b[0]);

  let merged = []; // 用來存放合併後的區間
  let overlap = []; // 用來存放重疊區間
  let notInclude = []; // 用來存放未包含的區間

  // 初始當前區間設為排序後的第一個區間
  let current = rangeList[0];

  // 遍歷所有區間
  for (let i = 1; i < rangeList.length; i++) {
    let next = rangeList[i];

    // 如果當前區間和下一個區間有重疊，則合併這兩個區間
    if (current[1] >= next[0]) {
      overlap.push([Math.max(current[0], next[0]), Math.min(current[1], next[1])]);
      current[1] = Math.max(current[1], next[1]);
    } else {
      // 如果沒有重疊，將當前區間放入合併結果
      merged.push(current);
      current = next;
    }
  }

  // 將最後一個區間也加入合併結果
  merged.push(current);

  // 找出未包含的區間
  let lastEnd = 0;

  for (let i = 0; i < merged.length; i++) {
    let [start, end] = merged[i];

    // 如果區間的起點大於 lastEnd，表示有未包含的區間
    if (start > lastEnd) {
      notInclude.push([lastEnd, start - 1]);
    }
    lastEnd = end + 1;
  }

  // 如果合併後的區間結束點小於 20，則補上最後一段未包含的區間
  if (lastEnd <= 20) {
    notInclude.push([lastEnd, 20]);
  }

  return { overlap, notInclude };
};
