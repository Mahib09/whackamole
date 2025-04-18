declare module "emoji-flags" {
  interface EmojiFlag {
    code: string;
    emoji: string;
    unicode: string;
    name: string;
  }

  const emojiFlags: {
    data: EmojiFlag[];
    [code: string]: EmojiFlag;
  };

  export default emojiFlags;
}
