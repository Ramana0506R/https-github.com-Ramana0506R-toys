/**
 * Utility to copy text to clipboard with fallback for non-secure contexts.
 * @param text The string to copy.
 * @returns A promise that resolves to true if successful.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Try modern API first
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Modern clipboard copy failed:", err);
    }
  }

  // Fallback for non-secure contexts (HTTP) or older browsers
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Ensure the textarea is off-screen
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    
    if (successful) return true;
  } catch (err) {
    console.error("Fallback clipboard copy failed:", err);
  }

  return false;
}
