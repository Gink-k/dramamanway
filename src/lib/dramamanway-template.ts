export const DRAMAMANWAY_TEMPLATE = new RegExp(
    `\\[ По пути дорамщика ] #(?<index>\\d\\d?)

(?<titleRu>.+) \\| (?<titleEng>.+) \\| (?<titleOriginal>.+)

(?<year>\\d{4}) год - (?<episodesNumber>\\d+) серий

=== О чем 💬 ===:
(?<about>.+)
=== Идея ✨ ===:
(?<ideaSection>.+)
=== Впечатления 🙀 ===:
(?<feedbak>.+)
=== Что не понравилось? 🚫 ===:
(?<negativeAspects>.+)
=== Каст 👫 ===:
(?<casteSection>- \\w+ - .+)+
=== Оценки 💯 ===:
* Сюжет - (?<plot>\\d\\d?) из 10
* Диалоги - (?<dialogues>\\d\\d?) из 10
* Реализация идеи - (?<idea>\\d\\d?) из 10
* Саундтрек - (?<soundtrack>\\d\\d?) из 10
* Достаточность(отсутствие лишнего) - (?<sufficiency>\\d\\d?) из 10
* Каст - (?<caste>\\d\\d?) из 10
* Вероятность, что я пересмотрю - (?<rewatchingChance>\\d\\d?) из 10
-----
* Клишированность - (?<cliche>\\d\\d?) из 10
* Тупость - (?<stupidity>\\d\\d?) из 10
* Затянутость - (?<tightness>\\d\\d?) из 10
-----
* Итоговая оценка: (?<finalScore>\\d\\d?) из 10

=== Рекомендация к просмотру 📺 ===:
(?<recommendation>.+)

=== Следующая остановка "(?<nextPost>.+)" 🚌 ===

#dramamanway #dorama #дорама
`.replace(' ', '\\s*')
);
