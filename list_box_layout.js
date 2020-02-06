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

        // Выпадающие списки РАЙОНЫ
        listBoxItems = [
          new ymaps.control.ListBoxItem({
              data: {
                  content: 'Центральный',
                  center: [51.674438, 39.212217],
                  zoom: 12
              }
          }),
          new ymaps.control.ListBoxItem({
            data: {
                content: 'Ленинский',
                center: [51.640004, 39.186291],
                zoom: 12
            }
        }),
            new ymaps.control.ListBoxItem({
              data: {
                  content: 'Советский',
                  center: [51.654227, 39.116762],
                  zoom: 12
              }
          }),
          new ymaps.control.ListBoxItem({
            data: {
                content: 'Левобережный',
                center: [51.629724, 39.245913],
                zoom: 12
            }
        }),
        new ymaps.control.ListBoxItem({
          data: {
              content: 'Коминтерновский',
              center: [51.694914, 39.165648],
              zoom: 12
          }
      }),
            new ymaps.control.ListBoxItem({
                data: {
                    content: 'Железнодорожный',
                    center: [51.698236, 39.296542],
                    zoom: 12
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
    // Чтобы не кластеризовались
        clusterize: false,
        gridSize: 32,
        clusterDisableClickZoom: true
    });


    var data = {};

    data.type     = "FeatureCollection";
    data.features = [];

    // Задаем цвет меткам и точку в центре, если нужно без точки то redIcon вместо дотикон
    objectManager.objects.options.set('preset', 'islands#redDotIcon');
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Центральный

var obj = {
    "type": "Feature",
    "id": 0,
    "geometry": {
        "type": "Point",
        "coordinates": [51.698961, 39.231729]
    },
    "properties": {
        "content": "Центральный",
        "balloonContentHeader": "Рынок на березовой роще",
        "balloonContentBody": "ул. Ломоносова, Остановка Берёзовая роща"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 1,
    "geometry": {
        "type": "Point",
        "coordinates": [51.66897, 39.196379]
    },
    "properties": {
        "content": "Центральный",
        "balloonContentHeader": "тц \"МИР\"",
        "balloonContentBody": "ул. Средне-Московская, 32Б"
      }
};
data.features.push(obj);

//Ленинский

var obj = {
    "type": "Feature",
    "id": 20,
    "geometry": {
        "type": "Point",
        "coordinates": [51.655797, 39.18533]
    },
    "properties": {
        "content": "Ленинский",
        "balloonContentHeader": "Цирк",
        "balloonContentBody": "ул. 20-летия Октября, 121"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 21,
    "geometry": {
        "type": "Point",
        "coordinates": [51.662557, 39.196047]
    },
    "properties": {
        "content": "Ленинский",
        "balloonContentHeader": "Центральный Рынок",
        "balloonContentBody": "ул. Пушкинская, 8"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 22,
    "geometry": {
        "type": "Point",
        "coordinates": [51.650131, 39.17632]
    },
    "properties": {
        "content": "Ленинский",
        "balloonContentHeader": "Мини-рынок Моисеева",
        "balloonContentBody": "ул. Моисеева, 59"
      }
};
data.features.push(obj);

// Советский

var obj = {
    "type": "Feature",
    "id": 40,
    "geometry": {
        "type": "Point",
        "coordinates": [51.649013, 39.159189]
    },
    "properties": {
        "content": "Советский",
        "balloonContentHeader": "Мини-рынок \"Ярмарка\"",
        "balloonContentBody": "ул. Ворошилова, 38Д"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 41,
    "geometry": {
        "type": "Point",
        "coordinates": [51.653752, 39.149407]
    },
    "properties": {
        "content": "Советский",
        "balloonContentHeader": "Напротив тц \"Лента\"",
        "balloonContentBody": "ул. Домостроителей, 13"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 42,
    "geometry": {
        "type": "Point",
        "coordinates": [51.650902, 39.137935]
    },
    "properties": {
        "content": "Советский",
        "balloonContentHeader": "Мини-рынок Героев Сибиряков",
        "balloonContentBody": "ул. Героев Сибиряков, 23"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 43,
    "geometry": {
        "type": "Point",
        "coordinates": [51.654556, 39.11925]
    },
    "properties": {
        "content": "Советский",
        "balloonContentHeader": "Мини-рынок \"Комарова\"",
        "balloonContentBody": "ул. Южно-Моравская улица, 38, киоск 15"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 44,
    "geometry": {
        "type": "Point",
        "coordinates": [51.68296, 39.084315]
    },
    "properties": {
        "content": "Советский",
        "balloonContentHeader": "Придонской",
        "balloonContentBody": "ул. 232 Стрелковой Дивизии, 4А"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 45,
    "geometry": {
        "type": "Point",
        "coordinates": [51.65464, 39.102164]
    },
    "properties": {
        "content": "Советский",
        "balloonContentHeader": "Мини-рынок",
        "balloonContentBody": "ул. Генерала Перхоровича, 31Д"
      }
};
data.features.push(obj);

//Левобережный

var obj = {
    "type": "Feature",
    "id": 60,
    "geometry": {
        "type": "Point",
        "coordinates": [51.598276, 39.249641]
    },
    "properties": {
        "content": "Левобережный",
        "balloonContentHeader": "Рынок Машмет",
        "balloonContentBody": "ул. Чебышева, 9, киоск 107"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 61,
    "geometry": {
        "type": "Point",
        "coordinates": [51.633123, 39.269224]
    },
    "properties": {
        "content": "Левобережный",
        "balloonContentHeader": "Циолковского",
        "balloonContentBody": "ул. Циолковского, 125"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 62,
    "geometry": {
        "type": "Point",
        "coordinates": [51.612087, 39.236714]
    },
    "properties": {
        "content": "Левобережный",
        "balloonContentHeader": "Новосибирская",
        "balloonContentBody": "ул. Новосибирская, 32б"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 63,
    "geometry": {
        "type": "Point",
        "coordinates": [51.67135, 39.253467]
    },
    "properties": {
        "content": "Левобережный",
        "balloonContentHeader": "Придача",
        "balloonContentBody": "ул. Димитрова, 64А"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 64,
    "geometry": {
        "type": "Point",
        "coordinates": [51.638836, 39.234809]
    },
    "properties": {
        "content": "Левобережный",
        "balloonContentHeader": "КЕШ",
        "balloonContentBody": "Ленинский проспект, 11А"
      }
};
data.features.push(obj);

// Коминтерновский

var obj = {
    "type": "Feature",
    "id": 80,
    "geometry": {
        "type": "Point",
        "coordinates": [51.696366, 39.18171]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "Рынок",
        "balloonContentBody": "Московский проспект, 21А"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 81,
    "geometry": {
        "type": "Point",
        "coordinates": [51.717552, 39.172547]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "Торговый двор \"Соборный\"",
        "balloonContentBody": "ул. Владимира Невского, 48з"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 82,
    "geometry": {
        "type": "Point",
        "coordinates": [51.708562, 39.149963]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "Молодежный",
        "balloonContentBody": "ул. Владимира Невского, 12А"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 83,
    "geometry": {
        "type": "Point",
        "coordinates": [51.70802, 39.172906]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "Жукова",
        "balloonContentBody": "ул. Маршала Жукова, 1"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 84,
    "geometry": {
        "type": "Point",
        "coordinates": [51.680336, 39.186309]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "Варейкиса",
        "balloonContentBody": "ул. Варейкиса, 73"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 85,
    "geometry": {
        "type": "Point",
        "coordinates": [51.675572, 39.140522]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "9 Января, 183",
        "balloonContentBody": "ул. 9 Января, 183"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 86,
    "geometry": {
        "type": "Point",
        "coordinates": [51.682999, 39.124586]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "9 января 274-276",
        "balloonContentBody": "ул. 9 января, 274-276"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 87,
    "geometry": {
        "type": "Point",
        "coordinates": [51.688097, 39.1348]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "45-й Стрелковой Дивизии",
        "balloonContentBody": "ул. 45-й Стрелковой Дивизии, 259/4"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 88,
    "geometry": {
        "type": "Point",
        "coordinates": [51.71061, 39.187288]
    },
    "properties": {
        "content": "Коминтерновский",
        "balloonContentHeader": "Московский проспект, 100",
        "balloonContentBody": "Московский проспект, 100"
      }
};
data.features.push(obj);

//Железнодорожный

var obj = {
    "type": "Feature",
    "id": 100,
    "geometry": {
        "type": "Point",
        "coordinates": [51.688097, 39.1348]
    },
    "properties": {
        "content": "Железнодорожный",
        "balloonContentHeader": "45-й Стрелковой Дивизии",
        "balloonContentBody": "ул. 45-й Стрелковой Дивизии, 259/4"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 101,
    "geometry": {
        "type": "Point",
        "coordinates": [51.688097, 39.1348]
    },
    "properties": {
        "content": "Железнодорожный",
        "balloonContentHeader": "45-й Стрелковой Дивизии",
        "balloonContentBody": "ул. 45-й Стрелковой Дивизии, 259/4"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 102,
    "geometry": {
        "type": "Point",
        "coordinates": [51.688097, 39.1348]
    },
    "properties": {
        "content": "Железнодорожный",
        "balloonContentHeader": "45-й Стрелковой Дивизии",
        "balloonContentBody": "ул. 45-й Стрелковой Дивизии, 259/4"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 103,
    "geometry": {
        "type": "Point",
        "coordinates": [51.688097, 39.1348]
    },
    "properties": {
        "content": "Железнодорожный",
        "balloonContentHeader": "45-й Стрелковой Дивизии",
        "balloonContentBody": "ул. 45-й Стрелковой Дивизии, 259/4"
      }
};
data.features.push(obj);

var obj = {
    "type": "Feature",
    "id": 104,
    "geometry": {
        "type": "Point",
        "coordinates": [51.688097, 39.1348]
    },
    "properties": {
        "content": "Железнодорожный",
        "balloonContentHeader": "45-й Стрелковой Дивизии",
        "balloonContentBody": "ул. 45-й Стрелковой Дивизии, 259/4"
      }
};
data.features.push(obj);


    /* Образец
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
    */
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    objectManager.add(data);
    myMap.geoObjects.add(objectManager);

    /* Добавление точек Конец */

}
