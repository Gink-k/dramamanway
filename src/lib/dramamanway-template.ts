export const DRAMAMANWAY_TEMPLATE = new RegExp(
    `\\[ По пути дорамщика ] #(?<index>\\d\\d?)

(?<titleRu>.+) \\| (?<titleEng>.+) \\| (?<titleOriginal>.+)

(?<country>.+) - (?<year>\\d{4}) год - (?<episodesNumber>\\d+).+

=== О чем . ===:
(?<about>.+)
=== Идея . ===:
(?<ideaSection>.+)
=== Впечатления . ===:
(?<feedbak>.+)
=== .+ ===:
(?<negativeAspects>.+)
=== .+ ===:
(?<casteSection>.+)
=== .+ ===:
\\* Сюжет - (?<plot>\\d\\d?) из 10 (?<plotComment>.*)
\\* Диалоги - (?<dialogues>\\d\\d?) из 10 (?<dialoguesComment>.*)
\\* Реализация идеи - (?<idea>\\d\\d?) из 10 (?<ideaComment>.*)
\\* Саундтрек - (?<soundtrack>\\d\\d?) из 10 (?<soundtrackComment>.*)
\\* Достаточность\\(отсутствие лишнего\\) - (?<sufficiency>\\d\\d?) из 10 (?<sufficiencyComment>.*)
\\* Каст - (?<caste>\\d\\d?) из 10 (?<casteComment>.*)
\\* Вероятность, что я пересмотрю - (?<rewatchingChance>\\d\\d?) из 10 (?<rewatchingChanceComment>.*)
-----
\\* Клишированность - (?<cliche>\\d\\d?) из 10 (?<clicheComment>.*)
\\* Тупость - (?<stupidity>\\d\\d?) из 10 (?<stupidityComment>.*)
\\* Затянутость - (?<tightness>\\d\\d?) из 10 (?<tightnessComment>.*)
-----
\\* Итоговая оценка: (?<finalScore>\\d\\d?) из 10 (?<finalScoreComment>.*)

=== .+ ===:
(?<recommendation>.+)

=== Следующая остановка \\"(?<nextPost>.+)\\"`
        .replaceAll(' ', '\\s+')
        .replace(/^/gm, '\\s*'),
    'is'
);
