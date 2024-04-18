export function ScrollHook(ref) {
  const scrollToBottomWithRef = () => {
    ref.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };
  return scrollToBottomWithRef;
}
