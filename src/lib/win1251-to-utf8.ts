export const win1251ToUtf8 = (html: ArrayBuffer) => {
    const decoder = new TextDecoder('windows-1251');

    return decoder.decode(html, {});
};
