ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
            center: [51.669067, 39.195238],
            zoom: 11,
            controls: []
        }),
        // Создадим собственный макет выпадающего списка.
        ListBoxLayout = ymaps.templateLayoutFactory.createClass(
            "<button id='my-listbox-header' class='btn btn-success dropdown-toggle' data-toggle='dropdown'>" +
                "{{data.title}} <span class='caret'></span>" +
            "</button>" +
            // Этот элемент будет служить контейнером для элементов списка.
            // В зависимости от того, свернут или развернут список, этот контейнер будет
            // скрываться или показываться вместе с дочерними элементами.
            "<ul id='my-listbox'" +
                " class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu'" +
                " style='display: {% if state.expanded %}block{% else %}none{% endif %};'></ul>", {

            build: function() {
                // Вызываем метод build родительского класса перед выполнением
                // дополнительных действий.
                ListBoxLayout.superclass.build.call(this);

                this.childContainerElement = $('#my-listbox').get(0);
                // Генерируем специальное событие, оповещающее элемент управления
                // о смене контейнера дочерних элементов.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: this.childContainerElement,
                    oldChildContainerElement: null
                });
            },

            // Переопределяем интерфейсный метод, возвращающий ссылку на
            // контейнер дочерних элементов.
            getChildContainerElement: function () {
                return this.childContainerElement;
            },

            clear: function () {
                // Заставим элемент управления перед очисткой макета
                // откреплять дочерние элементы от родительского.
                // Это защитит нас от неожиданных ошибок,
                // связанных с уничтожением dom-элементов в ранних версиях ie.
                this.events.fire('childcontainerchange', {
                    newChildContainerElement: null,
                    oldChildContainerElement: this.childContainerElement
                });
                this.childContainerElement = null;
                // Вызываем метод clear родительского класса после выполнения
                // дополнительных действий.
                ListBoxLayout.superclass.clear.call(this);
            }
        }),

        // Также создадим макет для отдельного элемента списка.
        ListBoxItemLayout = ymaps.templateLayoutFactory.createClass(
            "<li><a>{{data.content}}</a></li>"
        ),

        // Создадим 2 пункта выпадающего списка
        listBoxItems = [
            new ymaps.control.ListBoxItem({
                data: {
                    content: 'Центральный',
                    center: [51.669067, 39.195238],
                    zoom: 13
                }
            }),
            new ymaps.control.ListBoxItem({
                data: {
                    content: 'Коминтерновский',
                    center: [51.696303, 39.184861],
                    zoom: 13
                }
            })
        ],

        // Теперь создадим список, содержащий 2 пункта.
        listBox = new ymaps.control.ListBox({
                items: listBoxItems,
                data: {
                    title: 'Выберите район'
                },
                options: {
                    // С помощью опций можно задать как макет непосредственно для списка,
                    layout: ListBoxLayout,
                    // так и макет для дочерних элементов списка. Для задания опций дочерних
                    // элементов через родительский элемент необходимо добавлять префикс
                    // 'item' к названиям опций.
                    itemLayout: ListBoxItemLayout
                }
            });

        listBox.events.add('click', function (e) {
            // Получаем ссылку на объект, по которому кликнули.
            // События элементов списка пропагируются
            // и их можно слушать на родительском элементе.
            var item = e.get('target');
            // Клик на заголовке выпадающего списка обрабатывать не надо.
            if (item != listBox) {
                myMap.setCenter(
                    item.data.get('center'),
                    item.data.get('zoom')
                );
                objectManager.setFilter('properties.content == "' + item.data.get('content') + '"');
            }
        });

    myMap.controls.add(listBox, {float: 'left'});


    /* Добавление точек Начало */

    // При выборе района просто происходит перемещение по карте, ничего больше делать не нужно. (скрывать, показывать и тп)

    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32,
        clusterDisableClickZoom: true
    });


    var data = {};

    data.type     = "FeatureCollection";
    data.features = [];

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // 1 Точка
    var obj = {
        "type": "Feature",
        "id": 0,
        "geometry": {
            "type": "Point",
            "coordinates": [51.670516, 39.213824]
        },
        "properties": {
            "content": "Центральный",
            "balloonContentHeader": "Заголовок 1",
            "balloonContentBody": "Текст 1",
            "balloonContentFooter": "Еще текст 1",
            "clusterCaption": "Подсказка 1"
        }
    };
    data.features.push(obj);

    // 2 Точка
    var obj = {
        "type": "Feature",
        "id": 1,
        "geometry": {
            "type": "Point",
            "coordinates": [51.693732, 39.162343]
        },
        "properties": {
            "content": "Коминтерновский",
            "balloonContentHeader": "Заголовок 2",
            "balloonContentBody": "Текст 2",
            "balloonContentFooter": "Еще текст 2",
            "clusterCaption": "Подсказка 2"
        }
    };
    data.features.push(obj);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    objectManager.add(data);
    myMap.geoObjects.add(objectManager);

    /* Добавление точек Конец */

}
