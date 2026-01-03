# median-of-two-sorted-arrays

This is a **classic hard interview problem**. I’ll explain it **clearly**, step-by-step, using the **correct O(log (m+n)) approach**, and then give **clean JavaScript code**.

---

## 🧠 Key Idea (Important)

We **do NOT merge** the arrays (that would be `O(m+n)` ❌).

Instead, we use **Binary Search on the smaller array** to find a **perfect partition**.

---

## 🎯 Goal of Partition

We want to split both arrays such that:

* Left half contains **half of total elements**
* All elements in **left ≤ right**
* Median depends on **even / odd** total length

---

## ✂️ Partition Explanation

Assume:

* `nums1` is smaller array
* Partition nums1 at index `i`
* Partition nums2 at index `j`

So that:

```
i + j = (m + n + 1) / 2
```

Then define:

```text
left1  = nums1[i - 1] or -∞
right1 = nums1[i]     or +∞
left2  = nums2[j - 1] or -∞
right2 = nums2[j]     or +∞
```

### ✅ Correct partition condition:

```text
left1 ≤ right2 AND left2 ≤ right1
```

---

## 🧮 Median Logic

* **Odd total length** → `max(left1, left2)`
* **Even total length** →
  `(max(left1, left2) + min(right1, right2)) / 2`

---

## ✅ JavaScript Solution (O(log(min(m,n))))

```js
function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  let m = nums1.length;
  let n = nums2.length;

  let low = 0;
  let high = m;

  while (low <= high) {
    let i = Math.floor((low + high) / 2);
    let j = Math.floor((m + n + 1) / 2) - i;

    let left1 = (i === 0) ? -Infinity : nums1[i - 1];
    let right1 = (i === m) ? Infinity : nums1[i];

    let left2 = (j === 0) ? -Infinity : nums2[j - 1];
    let right2 = (j === n) ? Infinity : nums2[j];

    // Correct partition
    if (left1 <= right2 && left2 <= right1) {
      // Odd length
      if ((m + n) % 2 === 1) {
        return Math.max(left1, left2);
      }
      // Even length
      return (
        Math.max(left1, left2) + Math.min(right1, right2)
      ) / 2;
    }
    // Move partition left
    else if (left1 > right2) {
      high = i - 1;
    }
    // Move partition right
    else {
      low = i + 1;
    }
  }

  return 0;
}
```

---

## 🧪 Example Walkthrough

### Example 2

```js
nums1 = [1,2]
nums2 = [3,4]
```

Merged: `[1,2,3,4]`
Median = `(2 + 3) / 2 = 2.5`

✔️ Code finds it without merging.

---

## ⏱ Complexity (Interview Gold)

* **Time Complexity:** `O(log(min(m,n)))`
* **Space Complexity:** `O(1)`

---


