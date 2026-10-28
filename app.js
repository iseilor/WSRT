(function () {
    'use strict';

    var program = [
        { date: '03.09', title: 'Заезд команд и участников', text: 'Подготовка рабочих мест на конкурсных площадках.' },
        { date: '04.09', title: 'Общий сбор и инструктаж', text: 'Знакомство участников с конкурсными заданиями и инфраструктурой.' },
        { date: '05.09', title: 'Официальное открытие', text: 'Старт корпоративного чемпионата по стандартам WorldSkills.', key: true, badge: 'Открытие' },
        { date: '05–07.09', title: 'Конкурсные дни', text: 'Выполнение заданий и окончательное внесение результатов в оценочный лист.', key: true, badge: '3 дня' },
        { date: '08.09', title: 'Подведение итогов', text: 'Торжественное закрытие и награждение победителей.', key: true, badge: 'Финал' },
        { date: '09.09', title: 'Отъезд', text: 'Отъезд экспертов и участников.' }
    ];

    var competencies = [
        {
            title: 'Магистральные линии связи',
            text: 'Строительство и эксплуатация волоконно-оптических линий передачи: монтаж и сварка оптического кабеля, измерения, поиск и устранение повреждений на магистрали.',
            skills: ['Сварка ВОЛС', 'Рефлектометрия', 'Монтаж муфт', 'Измерения затухания']
        },
        {
            title: 'Сетевое и системное администрирование',
            text: 'Проектирование и настройка корпоративной сетевой инфраструктуры и серверов: маршрутизация, коммутация, службы каталогов, отказоустойчивость и диагностика.',
            skills: ['Маршрутизация', 'Linux / Windows Server', 'VLAN', 'Отказоустойчивость']
        },
        {
            title: 'Кибербезопасность',
            text: 'Защита инфраструктуры от атак: анализ уязвимостей, расследование инцидентов, настройка средств защиты и реагирование в условиях, приближенных к реальным.',
            skills: ['Анализ уязвимостей', 'SOC', 'Расследование инцидентов', 'Защита периметра']
        },
        {
            title: 'Охрана труда',
            text: 'Организация безопасных условий работы: оценка рисков, расследование несчастных случаев, разработка локальных документов и обучение персонала.',
            skills: ['Оценка рисков', 'Нормативная база', 'Расследование', 'Обучение']
        },
        {
            title: 'Машинное обучение и большие данные',
            text: 'Решение прикладных задач на данных компании: подготовка датасетов, построение и валидация моделей, интерпретация результатов для бизнеса.',
            skills: ['Python', 'Feature engineering', 'ML-модели', 'Визуализация']
        }
    ];

    function el(tag, cls, html) {
        var node = document.createElement(tag);
        if (cls) node.className = cls;
        if (html != null) node.innerHTML = html;
        return node;
    }

    // Программа
    var $timeline = document.getElementById('timeline');
    program.forEach(function (e) {
        var li = el('li', 'event reveal' + (e.key ? ' key' : ''));
        li.innerHTML = '<span class="event-dot"></span>' +
            (e.badge ? '<span class="event-badge">' + e.badge + '</span>' : '') +
            '<time>' + e.date + '</time><h3>' + e.title + '</h3><p>' + e.text + '</p>';
        $timeline.appendChild(li);
    });

    // Компетенции
    var $acc = document.getElementById('accordion');
    competencies.forEach(function (c, i) {
        var item = el('div', 'acc-item reveal' + (i === 0 ? ' open' : ''));
        var id = 'acc-' + i;
        item.innerHTML =
            '<button class="acc-head" type="button" aria-expanded="' + (i === 0) + '" aria-controls="' + id + '">' +
                '<span class="acc-num">0' + (i + 1) + '</span>' +
                '<span class="acc-title">' + c.title + '</span>' +
                '<span class="acc-icon" aria-hidden="true"></span>' +
            '</button>' +
            '<div class="acc-body" id="' + id + '"><div><div class="acc-content">' +
                '<p>' + c.text + '</p>' +
                '<ul class="skills">' + c.skills.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
            '</div></div></div>';
        $acc.appendChild(item);
    });

    $acc.addEventListener('click', function (e) {
        var head = e.target.closest('.acc-head');
        if (!head) return;
        var item = head.parentNode;
        var open = !item.classList.contains('open');
        item.classList.toggle('open', open);
        head.setAttribute('aria-expanded', open);
    });

    // Статус чемпионата
    var start = new Date('2022-09-05T09:00:00+03:00');
    var end = new Date('2022-09-08T20:00:00+03:00');
    var now = new Date();
    var status = document.getElementById('status');
    if (now < start) {
        var days = Math.ceil((start - now) / 864e5);
        status.textContent = 'До старта: ' + days + ' дн.';
    } else if (now <= end) {
        status.textContent = 'Чемпионат идёт прямо сейчас';
    } else {
        status.textContent = 'Чемпионат завершён. Спасибо участникам и экспертам!';
    }

    // Меню
    var header = document.getElementById('header');
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');

    burger.addEventListener('click', function () {
        var open = !nav.classList.contains('open');
        nav.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open);
        header.classList.add('scrolled');
    });

    nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
        }
    });

    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 40 || nav.classList.contains('open'));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Появление блоков, счётчики и подсветка пункта меню
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function countUp(node) {
        var target = Number(node.dataset.count);
        if (reduced) return;
        var t0 = null;
        function step(t) {
            if (!t0) t0 = t;
            var p = Math.min((t - t0) / 900, 1);
            node.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
        var revealer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                var counter = entry.target.querySelector('[data-count]');
                if (counter) countUp(counter);
                revealer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.reveal').forEach(function (n) { revealer.observe(n); });

        var links = nav.querySelectorAll('a');
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (a) {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (n) { n.classList.add('visible'); });
    }
})();
