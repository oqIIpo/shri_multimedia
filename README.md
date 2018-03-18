[Демо](https://mrpq.github.io/shri_multimedia/)

По необходимому набору эффектов:

1.  Цветокоррекция – сначала сделал с помощью CSS (фильтры grayscale + sepia + hue-rotate + еще несколько). При таком подходе не удовлетворял получающийся цвет. C помощью webgl нужный эффект достигается невероятно лекго.
2.  Анимированный интерфейс – быстрая печать текста в DOM существенно понижала FPS (справедливости ради должен сказать, что не попробовал писать в nodeValue, только в innerhtml, первый вроде быстрее). Поэтому решил рисовать в канвас, что в последствии, когда добавлял визуализацию звука, стало необходимостью.
    Визуализация звука – вдохновлялся инфой с mdn.
3.  Помехи: в сети большое количество классных шумов на GLSL, поэтому сразу смотрел в эту сторону. + такой подход не бъет по производительности. Можно было попробовать добиться похожего эффекта средствами CSS, но мне изначально было интересней поразбираться с webgl.

Много времени ушло на чтение статей по webgl, чтобы применять его осознано. По этой причине не хватило времени отполировать интерфейс – все фичи реализованы минимально.

Постарался разделить код по отдельным файлам
`js/webgl/helpers.js` - вспомогательные функции для создания шейдеров, инициализации программы

`js/webgl/shaders.js` - код вертексного шейдера и 2х фрагментных шейдеров. 2 шейдера, потому что шейдер который генерирует глитчи сильно просаживал fps на моей машине, поэтому его отдаю программе лишь изредка. В остальное время работает шейдер который генерирует белый шум.

`constants` - константы (dom элементы, с которыми работает программа, и т.п.)

`drawTexture` - отрисовка видеопотока с вебкамеры в канвас, содержимое которого будет передаваться в webgl

`drawInterface` - отрисовка бегущего текста и визуализация звука.

`streamContainer` - контейнер для видео и аудио потоков. инициализирует потоки, предоставляет api для извлечения необходимых данных об аудио потоке.
