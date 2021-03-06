/*!
 * altoPopover.js
 * Файл jquery-плагина для динамического вывода тултипов
 *
 * @author      Андрей Воронов <andreyv@gladcode.ru>
 * @copyrights  Copyright © 2015, Андрей Воронов
 * @version     0.0.1 от 19.02.2015 20:42
 * @since       Alto 1.1
 */

/**
 * Пример:
 * <a
 *      data-alto-role="popover"
 *      data-api="user/{$oUser->getId()}"
 *      data-api-param-tpl="default"
 *      data-trigger="click"
 *      data-placement="top"
 *      data-animation="true"
 *      data-cache="false"
 *      class="userlogo" href="#">{$oUser->getDisplayName()}</a>
 */

// Объекты jQuery и ls не видны из этого файла, поэтому в JSLint для
// пропуска проверки параметров этой функции они внесены как заранее
// предопределённые

/* global jQuery, ls */

(function ($, ls) {

    "use strict";

    //================================================================================================================
    //      ОПРЕДЕЛЕНИЕ ОБЪЕКТА
    //================================================================================================================
    var altoPopover = function (element, options) {

        // Вызывающий объект в формате jQuery
        this.$element = $(element);

        // Флаг блокирования повторных аякс-запросов
        this.blockButtons = false;

        // Кэш тултипа
        this.cachedData = false;

        // Мышь на активном popover-е
        this.over = false;

        // Опции плагина
        this.options = $.extend({}, $.fn.altoPopover.defaultOptions, options, this.$element.data());

        // Инициализация плагина
        this.init();

        return this;
    };

    //================================================================================================================
    //      ОПРЕДЕЛЕНИЕ ПРОТОТИПА ОБЪЕКТА
    //================================================================================================================
    altoPopover.prototype = {

        /**
         * Инициализация объекта. Вызывается автоматически в
         * конструкторе плагина.
         */
        init: function () {

            var $this = this,
                hidePopover = null;

            // Установим параметры поповера
            $this._checkParams();

            // Вывод поповера при клике
            if ($this.options.trigger === 'click') {
                // Поповер выводится при событии на гиперссылке и контейнере
                $this.$element
                    .on('click', function (e) {

                        // Если тултип открывается при клике, то нужно запретить дальнейший
                        // переход по ссылке. По умолчанию - поповер открывается при наведении мыши
                        if ($this.options.trigger === 'click') {
                            e.preventDefault();
                        }

                        // Сформируем поповер и, если нужно, получим его контент аяксом
                        $this._preparePopover();

                        $this.$element.popover('toggle');

                        return false;

                    });
            }

            // Вывод поповера при наведении
            if ($this.options.trigger === 'hover') {

                // Поповер выводится при событии на гиперссылке и контейнере
                $this.$element[jQuery().hoverIntent ? 'hoverIntent' : 'hover'](
                    function (event) {
                        event.preventDefault();
                        if ($this.$element.next('.popover').css('display') === 'block') {
                            return $this;
                        }
                        // Сформируем поповер и, если нужно, получим его контент аяксом
                        //noinspection JSCheckFunctionSignatures
                        jQuery('[data-alto-role="popover"]').not($this.$element).each(function () {
                            if ($(this).data('bs.popover') !== undefined) {
                                $(this).popover('hide');
                            }
                        });
                        $this._preparePopover();
                        if (!$this.$element.data('bs.popover').tip().is(':visible')) {
                            $this.$element.popover('show');
                        }
                    }
                );

                hidePopover = function () {
                    if ($this.cachedData && !$this.over) {
                        $this.$element.popover('hide');
                    }
                };
                $('body').on('click', function () {
                    hidePopover();
                });

            }

            return $this;
        },

        /**
         * Выводит поповер
         *
         * @returns {altoPopover}
         * @private
         */
        _preparePopover: function () {

            var $this = this,
                params;
            if (!$this.options.api) {
                return $this;
            }

            // Сформируем и покажем поповер
            $this.$element
                .popover({
                    animation: $this.options.animation,
                    content: '<div class="alto-popover-content"><div class="loader"></div></div>',
                    delay: 0,
                    html: true,
                    placement: $this.options.placement,
                    title: '',
                    trigger: 'manual',
                    container: $this.options.container
                })
                .data('bs.popover')
                .tip()
                .addClass($this.options.selector)
                .addClass('alto-popover');

            $this.$element.data('bs.popover').tip().mouseenter(function () {
                $this.over = true;
            }).mouseleave(function () {
                $this.over = false;
                $this.$element.popover('hide');
            });

            if (!$this.cachedData || $this.options.cache === false) {
                // При открытии, если нужно, то отправим запрос аяксом
                // к АПИ сайта на получение html всплывающего сообщения
                params = $this._loadParams();
                $this._showLoader();
                ls.ajaxGet(
                    ls.routerUrl('api') + $this.options.api,
                    params,
                    /**
                     * Выведем контент тултипа
                     * @param {{bStateError: {boolean}, result: {json}}} data
                     */
                    function (data) {
                        $this._hideLoader();
                        var result = $.parseJSON(data.result), popover;
                        if (data.bStateError) {
                            ls.msg.error(null, result.error);
                            $this.$element.popover('hide');
                            return;
                        }
                        $this.cachedData = '<div class="alto-popover-content">' + result.data + '</div>';
                        popover = $this.$element.attr('data-content', $this.cachedData).data('bs.popover');
                        popover.setContent();
                        popover.$tip.addClass(popover.options.placement);
                    }
                );
            }


            return $this;
        },

        /**
         * Возвращает параметры API-метода
         * @returns
         * @private
         */
        _loadParams: function () {

            var $this = this,
                data = {},
                key,
                currentParam;

            for (key in $this.options) {
                if ($this.options.hasOwnProperty(key)) {
                    //noinspection JSUnfilteredForInLoop
                    currentParam = key.match(/apiParam(\S+)/);
                    if (currentParam !== null && currentParam[1] !== undefined) {
                        //noinspection JSUnfilteredForInLoop
                        data[currentParam[1].toLowerCase()] = $this.options[key];
                    }
                }
            }

            return data;
        },

        /**
         * Проверяет масив на список допустимых знаений и если
         * допустимого значения нет, то возвращает дефолтное.
         *
         * @param {string} needle Искомое значение
         * @param {string[]} haystack Массив для поиска
         * @param {string} def Дефолтное значение
         * @returns {string}
         * @private
         */
        _checkArray: function (needle, haystack, def) {
            var found = false,
                key;
            for (key in haystack) {
                if (haystack.hasOwnProperty(key) && haystack[key] === needle) {
                    return needle;
                }
            }
            if (!found) {
                return def;
            }
        },

        /**
         * Дефолтные параметры перекрываются в дата-атрибутах их
         * необходимо проверить по допустимым значениям, если
         * значение ошибочно, то рабочим принимается дефолтное.
         * значение этого параметра
         *
         * @return {bool}
         * @private
         */
        _checkParams: function () {

            var $this = this;

            // Возможно два способа открытия всплывающего сообщения
            // при наведении мышью или апри клике на ссылку (click|hover),
            $this.options.trigger = $this._checkArray($this.options.trigger, ['click', 'hover'], 'hover');

            // Положение поповера четко фиксировано
            $this.options.placement = $this._checkArray($this.options.placement, ['top', 'left', 'right', 'bottom'], 'top');

            // Анимация
            $this.options.animation = $this.options.animation !== false;

            // Кэширование
            $this.options.cache = $this.options.cache !== false;

            return true;
        },

        /**
         * Отображает лоадеры формы
         * @private
         */
        _showLoader: function () {
            //ls.progressStart();
            return false;
        },

        /**
         * Скрывает лоадеры формы
         * @private
         */
        _hideLoader: function () {
            //ls.progressDone();
            return false;
        }

    };

    //================================================================================================================
    //      ОПРЕДЕЛЕНИЕ ПЛАГИНА
    //================================================================================================================

    /**
     * Определение плагина
     *
     * @param {boolean|object} option
     * @returns {altoPopover}
     */
    $.fn.altoPopover = function (option) {

        if (typeof option === 'boolean') {
            option = {};
        }

        //noinspection JSUnresolvedFunction
        return this.each(function () {
            var $this = $(this),
                data = $this.data('alto.altoPopover'),
                options = typeof option === 'object' && option;

            if (!data) {
                data = new altoPopover(this, options);
                $this.data('alto.altoPopover', data);
            }

            if (typeof option === 'string') {
                data[option]();
            }

            return $this;
        });

    };

    /**
     * Определение конструктора плагина
     *
     * @type {Function}
     */
    $.fn.altoPopover.Constructor = altoPopover;

    /**
     * Параметры плагина
     *
     * @type {object}
     */
    $.fn.altoPopover.defaultOptions = {
        trigger: 'hover', // Метод отображения поповера, может быть hover|click
        placement: 'top', // Положение поповера, может быть top|left|bottom|right
        animation: true,  // Анимация при отображении true|false
        cache: true,      // Кэширвоать ли данные и отображать только полученный при первом вызове результат true|false
        api: false,       // Вызываемое API,
        selector: '',     // Произвольный селектор
        container: false  // Контейнер
    };

}(window.jQuery, ls));


//====================================================================================================================
//      АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ ПЛАГИНА
//====================================================================================================================
jQuery(function () {

    "use strict";

    jQuery('[data-alto-role="popover"]')
        .altoPopover(false);

});

