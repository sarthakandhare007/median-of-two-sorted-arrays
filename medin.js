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
