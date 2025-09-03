export function $(id) {
  return document.getElementById(id);
}

export function toBigIntSecondsFromLocal(inputValue) {
  // Works with <input type="datetime-local"> or ISO-like strings.
  const ms = new Date(inputValue).getTime();
  if (Number.isNaN(ms)) throw new Error("Invalid datetime");
  return BigInt(Math.floor(ms / 1000));
}

export function toLocalFromSeconds(time) {
  const targetDate = new Date(time * 1000);
  const isoString = targetDate.toISOString();
  return isoString.slice(0, 16);
}

export function formatAmount(u256, decimals) {
  // u256: bigint | string | number
  const bn = typeof u256 === "bigint" ? u256 : BigInt(u256);
  const s = ethers.formatUnits(bn, decimals);
  return parseFloat(s).toLocaleString();
}

export function parseAmountToUnits(amountStr, decimals) {
  if (!amountStr || Number(amountStr) <= 0) throw new Error("Invalid amount");
  return ethers.parseUnits(amountStr, decimals); // returns bigint
}

export function short(addr, n = 4) {
  return addr ? `${addr.slice(0, 2 + n)}…${addr.slice(-n)}` : "";
}

export function onMetaMaskEvents({ onAccounts, onChain }) {
  if (!window.ethereum) return;
  window.ethereum.on?.("accountsChanged", onAccounts);
  window.ethereum.on?.("chainChanged", onChain);
}

export function offMetaMaskEvents({ onAccounts, onChain }) {
  if (!window.ethereum) return;
  window.ethereum.removeListener?.("accountsChanged", onAccounts);
  window.ethereum.removeListener?.("chainChanged", onChain);
}
