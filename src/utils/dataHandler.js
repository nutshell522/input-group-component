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
   * 解釋:
   * \B : 表示「非單詞邊界」，這個匹配是用來避免在數字的開頭添加逗號。例如在 `-7855948` 中，不會在負號之後立即添加逗號。
   * (?=...) : 正向先行斷言 (lookahead)，確保後面跟隨的模式可以匹配，但不消耗這些字符（即，不包含這些字符在最終匹配結果中）。
   * (\d{3}) : 匹配三個連續的數字。這是用來捕捉每三位數。
   * + : 指定可以有一個或多個三位數的組合。這意味著，正則會作用於每組三個數字，而不會只匹配一次。
   * (?!\d) : 負向先行斷言，確保後面不是一個數字。這樣可以避免在數字的末尾加入多餘的逗號。
   * g : 全局標誌，確保正則表達式應用於字串中的所有符合條件的部分，而不僅僅是第一個匹配結果。
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

    // 如果當前區間和下一個區間有重疊
    if (current[1] >= next[0]) {
      // 如果有重疊，記錄重疊的區間
      overlap.push([Math.max(current[0], next[0]), Math.min(current[1], next[1])]);

      // 合併兩個區間
      current[1] = Math.max(current[1], next[1]);
    } else {
      // 如果沒有重疊，將當前區間放入合併結果
      merged.push(current);
      // 更新當前區間為下一個區間
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

    // 更新 lastEnd 為當前區間的結束值加 1
    lastEnd = end + 1;
  }

  // 如果合併後的區間結束點小於 20，則補上最後一段未包含的區間
  if (lastEnd <= 20) {
    notInclude.push([lastEnd, 20]);
  }

  // 返回重疊區間和未包含區間
  return { overlap, notInclude };
};
