/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ticketapp_part3.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/vm-browserify/index.js":
/*!*********************************************!*\
  !*** ./node_modules/vm-browserify/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var indexOf = function (xs, item) {
    if (xs.indexOf) return xs.indexOf(item);
    else for (var i = 0; i < xs.length; i++) {
        if (xs[i] === item) return i;
    }
    return -1;
};
var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    if (context) {
        forEach(Object_keys(ctx), function (key) {
            context[key] = ctx[key];
        });
    }

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.isContext = function (context) {
    return context instanceof Context;
};

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};


/***/ }),

/***/ "./src/eventitem.js":
/*!**************************!*\
  !*** ./src/eventitem.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class EventItem {
    constructor(day, date, time, event, venue, city, price, isSoldOut, dateVal) {
        this.day = day;
        this.date = date;
        this.time = time;
        this.event = event;
        this.venue = venue;
        this.city = city;
        this.price = price;
        this.isSoldOut = isSoldOut;
        this.dateVal = dateVal;

        this.listing = document.createElement('div');
        this.listing.classList.add('event-listing');

        this.leftInfo = document.createElement('div');
        this.leftInfo.classList.add('left-info');

        this.rightInfo = document.createElement('div');
        this.rightInfo.classList.add('right-info');

        this.listing.appendChild(this.leftInfo);
        this.listing.appendChild(this.rightInfo);

        this.updateTimeInfo();
        this.updateEventInfo();
    };

    convertToUSD() {
        this.price = Math.ceil(parseInt(this.price.slice(1)) * 1.25);
        return "$" + `${this.price}`;
    }

    updateTimeInfo() {
        let timeInfo = document.createElement('ul');
        timeInfo.classList.add('time-info');

        let day = document.createElement('li');
        day.classList.add('day');
        day.innerHTML = `${this.day}`;

        let date = document.createElement('li');
        date.classList.add('date');
        date.innerHTML = `${this.date}`;

        let time = document.createElement('li');
        time.classList.add('time');
        time.innerHTML = `${this.time}`;

        timeInfo.appendChild(day);
        timeInfo.appendChild(date);
        timeInfo.appendChild(time);
        this.leftInfo.appendChild(timeInfo)
    };

    updateEventInfo() {
        let eventInfo = document.createElement('ul');
        eventInfo.classList.add('event-info');

        let price = document.createElement('div');
        price.classList.add('price');
        price.innerHTML = `${this.convertToUSD()}`;

        if (this.isSellingFast) {
            price.classList.add('yellow');
        } else {
            price.classList.add('green');
        };

        let eventName = document.createElement('li');
        eventName.classList.add('event-name');
        eventName.innerHTML = `${this.event}`;

        let venueName = document.createElement('li');
        venueName.classList.add('venue-name');
        venueName.innerHTML = `${this.venue}`;

        let venueCity = document.createElement('li');
        venueCity.classList.add('venueCity');
        venueCity.innerHTML = `${this.city}`;

        eventInfo.appendChild(eventName);
        eventInfo.appendChild(venueName);
        eventInfo.appendChild(venueCity);
        this.rightInfo.appendChild(eventInfo);
        this.rightInfo.appendChild(price);
    };
};

/* harmony default export */ __webpack_exports__["default"] = (EventItem);

/***/ }),

/***/ "./src/eventlist.js":
/*!**************************!*\
  !*** ./src/eventlist.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const eventlist = {
    "Items": [{
        "EventId": 2566910,
        "Day": "Sun",
        "Month": "Dec",
        "Date": "09 Dec 2018",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2018-12-09T20:00:00",
        "EndDateVal": null,
        "VenueName": "Toyota Center - TX",
        "VenueCapacity": 18043,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Houston",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 126478,
        "EventName": "Elton John",
        "MinPrice": "£137.57",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566910",
        "MetroAreaUrl": null,
        "AvailableTickets": 673,
        "TotalMaxDisplayTickets": 671,
        "AvailableTicketsNumber": 673,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Toyota Center - TX Houston on Sun 09 Dec 2018 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": true,
        "IsCheapestCityContent": "Cheapest tickets in Houston.",
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": true,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Dec",
            "WeekdayAndTime": "Sun 20:00",
            "DayOfMonth": "09",
            "Year": "2018",
            "Weekday": "Sun",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,043",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566911,
        "Day": "Wed",
        "Month": "Dec",
        "Date": "12 Dec 2018",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2018-12-12T20:00:00",
        "EndDateVal": null,
        "VenueName": "AT&T Center",
        "VenueCapacity": 18581,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "San Antonio",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 76768,
        "EventName": "Elton John",
        "MinPrice": "£78.85",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566911",
        "MetroAreaUrl": null,
        "AvailableTickets": 1064,
        "TotalMaxDisplayTickets": 1064,
        "AvailableTicketsNumber": 1064,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at AT&T Center San Antonio on Wed 12 Dec 2018 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Dec",
            "WeekdayAndTime": "Wed 20:00",
            "DayOfMonth": "12",
            "Year": "2018",
            "Weekday": "Wed",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,581",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566912,
        "Day": "Fri",
        "Month": "Dec",
        "Date": "14 Dec 2018",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2018-12-14T20:00:00",
        "EndDateVal": null,
        "VenueName": "American Airlines Center",
        "VenueCapacity": 18500,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Dallas",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 126299,
        "EventName": "Elton John",
        "MinPrice": "£103.38",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566912",
        "MetroAreaUrl": null,
        "AvailableTickets": 811,
        "TotalMaxDisplayTickets": 811,
        "AvailableTicketsNumber": 811,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at American Airlines Center Dallas on Fri 14 Dec 2018 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": true,
        "IsCheapestCityContent": "Cheapest tickets in Dallas.",
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Dec",
            "WeekdayAndTime": "Fri 20:00",
            "DayOfMonth": "14",
            "Year": "2018",
            "Weekday": "Fri",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,500",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566913,
        "Day": "Sat",
        "Month": "Dec",
        "Date": "15 Dec 2018",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2018-12-15T20:00:00",
        "EndDateVal": null,
        "VenueName": "American Airlines Center",
        "VenueCapacity": 18500,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Dallas",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 126299,
        "EventName": "Elton John",
        "MinPrice": "£119.65",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566913",
        "MetroAreaUrl": null,
        "AvailableTickets": 923,
        "TotalMaxDisplayTickets": 920,
        "AvailableTicketsNumber": 923,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at American Airlines Center Dallas on Sat 15 Dec 2018 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": true,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Dec",
            "WeekdayAndTime": "Sat 20:00",
            "DayOfMonth": "15",
            "Year": "2018",
            "Weekday": "Sat",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,500",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566914,
        "Day": "Fri",
        "Month": "Jan",
        "Date": "11 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-11T20:00:00",
        "EndDateVal": null,
        "VenueName": "Taco Bell Arena",
        "VenueCapacity": 12644,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Boise",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 126327,
        "EventName": "Elton John",
        "MinPrice": "£70.42",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566914",
        "MetroAreaUrl": null,
        "AvailableTickets": 1844,
        "TotalMaxDisplayTickets": 1844,
        "AvailableTicketsNumber": 1844,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Taco Bell Arena Boise on Fri 11 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Fri 20:00",
            "DayOfMonth": "11",
            "Year": "2019",
            "Weekday": "Fri",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "12,644",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566915,
        "Day": "Sat",
        "Month": "Jan",
        "Date": "12 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-12T20:00:00",
        "EndDateVal": null,
        "VenueName": "Moda Center at the Rose Quarter",
        "VenueCapacity": 20500,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Portland",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 76819,
        "EventName": "Elton John",
        "MinPrice": "£118.61",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566915",
        "MetroAreaUrl": null,
        "AvailableTickets": 961,
        "TotalMaxDisplayTickets": 961,
        "AvailableTicketsNumber": 961,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Moda Center at the Rose Quarter Portland on Sat 12 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Sat 20:00",
            "DayOfMonth": "12",
            "Year": "2019",
            "Weekday": "Sat",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "20,500",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566916,
        "Day": "Tue",
        "Month": "Jan",
        "Date": "15 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-15T20:00:00",
        "EndDateVal": null,
        "VenueName": "Save Mart Center",
        "VenueCapacity": 16182,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Fresno",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 105588,
        "EventName": "Elton John",
        "MinPrice": "£105.24",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566916",
        "MetroAreaUrl": null,
        "AvailableTickets": 1217,
        "TotalMaxDisplayTickets": 1215,
        "AvailableTicketsNumber": 1217,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Save Mart Center Fresno on Tue 15 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Tue 20:00",
            "DayOfMonth": "15",
            "Year": "2019",
            "Weekday": "Tue",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "16,182",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566917,
        "Day": "Wed",
        "Month": "Jan",
        "Date": "16 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-16T20:00:00",
        "EndDateVal": null,
        "VenueName": "Golden 1 Center",
        "VenueCapacity": 19000,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Sacramento",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 77255,
        "EventName": "Elton John",
        "MinPrice": "£219.06",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566917",
        "MetroAreaUrl": null,
        "AvailableTickets": 604,
        "TotalMaxDisplayTickets": 604,
        "AvailableTicketsNumber": 604,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Golden 1 Center Sacramento on Wed 16 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Wed 20:00",
            "DayOfMonth": "16",
            "Year": "2019",
            "Weekday": "Wed",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "19,000",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566918,
        "Day": "Fri",
        "Month": "Jan",
        "Date": "18 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-18T20:00:00",
        "EndDateVal": null,
        "VenueName": "Oracle Arena",
        "VenueCapacity": 19596,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Oakland",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 69623,
        "EventName": "Elton John",
        "MinPrice": "£184.19",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566918",
        "MetroAreaUrl": null,
        "AvailableTickets": 878,
        "TotalMaxDisplayTickets": 878,
        "AvailableTicketsNumber": 878,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Oracle Arena Oakland on Fri 18 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Fri 20:00",
            "DayOfMonth": "18",
            "Year": "2019",
            "Weekday": "Fri",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "19,596",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566919,
        "Day": "Sat",
        "Month": "Jan",
        "Date": "19 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-19T20:00:00",
        "EndDateVal": null,
        "VenueName": "SAP Center",
        "VenueCapacity": 17496,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "San Jose",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 77313,
        "EventName": "Elton John",
        "MinPrice": "£250.85",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566919",
        "MetroAreaUrl": null,
        "AvailableTickets": 813,
        "TotalMaxDisplayTickets": 813,
        "AvailableTicketsNumber": 813,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at SAP Center San Jose on Sat 19 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Sat 20:00",
            "DayOfMonth": "19",
            "Year": "2019",
            "Weekday": "Sat",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "17,496",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566920,
        "Day": "Tue",
        "Month": "Jan",
        "Date": "22 Jan 2019",
        "Time": "19:00",
        "EndDate": null,
        "DateVal": "2019-01-22T19:00:00",
        "EndDateVal": null,
        "VenueName": "STAPLES Center",
        "VenueCapacity": 18118,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Los Angeles",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 69136,
        "EventName": "Elton John",
        "MinPrice": "£53.74",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566920",
        "MetroAreaUrl": null,
        "AvailableTickets": 2554,
        "TotalMaxDisplayTickets": 2554,
        "AvailableTicketsNumber": 2554,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at STAPLES Center Los Angeles on Tue 22 Jan 2019 19:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Tue 19:00",
            "DayOfMonth": "22",
            "Year": "2019",
            "Weekday": "Tue",
            "Time": "19:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,118",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566921,
        "Day": "Wed",
        "Month": "Jan",
        "Date": "23 Jan 2019",
        "Time": "19:00",
        "EndDate": null,
        "DateVal": "2019-01-23T19:00:00",
        "EndDateVal": null,
        "VenueName": "STAPLES Center",
        "VenueCapacity": 18118,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Los Angeles",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 69136,
        "EventName": "Elton John",
        "MinPrice": "£48.91",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566921",
        "MetroAreaUrl": null,
        "AvailableTickets": 3118,
        "TotalMaxDisplayTickets": 3118,
        "AvailableTicketsNumber": 3118,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at STAPLES Center Los Angeles on Wed 23 Jan 2019 19:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Wed 19:00",
            "DayOfMonth": "23",
            "Year": "2019",
            "Weekday": "Wed",
            "Time": "19:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,118",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2601618,
        "Day": "Fri",
        "Month": "Jan",
        "Date": "25 Jan 2019",
        "Time": "19:00",
        "EndDate": null,
        "DateVal": "2019-01-25T19:00:00",
        "EndDateVal": null,
        "VenueName": "STAPLES Center",
        "VenueCapacity": 18118,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Los Angeles",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 69136,
        "EventName": "Elton John",
        "MinPrice": "£55.67",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2601618",
        "MetroAreaUrl": null,
        "AvailableTickets": 3835,
        "TotalMaxDisplayTickets": 3835,
        "AvailableTicketsNumber": 3835,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at STAPLES Center Los Angeles on Fri 25 Jan 2019 19:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Fri 19:00",
            "DayOfMonth": "25",
            "Year": "2019",
            "Weekday": "Fri",
            "Time": "19:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,118",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566922,
        "Day": "Sat",
        "Month": "Jan",
        "Date": "26 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-26T20:00:00",
        "EndDateVal": null,
        "VenueName": "Gila River Arena",
        "VenueCapacity": 18300,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Glendale",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 81174,
        "EventName": "Elton John",
        "MinPrice": "£154.38",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566922",
        "MetroAreaUrl": null,
        "AvailableTickets": 537,
        "TotalMaxDisplayTickets": 537,
        "AvailableTicketsNumber": 537,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Gila River Arena Glendale on Sat 26 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Sat 20:00",
            "DayOfMonth": "26",
            "Year": "2019",
            "Weekday": "Sat",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,300",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2569245,
        "Day": "Tue",
        "Month": "Jan",
        "Date": "29 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-29T20:00:00",
        "EndDateVal": null,
        "VenueName": "Valley View Casino Center",
        "VenueCapacity": 16100,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "San Diego",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 126481,
        "EventName": "Elton John",
        "MinPrice": "£203.30",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2569245",
        "MetroAreaUrl": null,
        "AvailableTickets": 988,
        "TotalMaxDisplayTickets": 988,
        "AvailableTicketsNumber": 988,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Valley View Casino Center San Diego on Tue 29 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Tue 20:00",
            "DayOfMonth": "29",
            "Year": "2019",
            "Weekday": "Tue",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "16,100",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2601617,
        "Day": "Wed",
        "Month": "Jan",
        "Date": "30 Jan 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-01-30T20:00:00",
        "EndDateVal": null,
        "VenueName": "STAPLES Center",
        "VenueCapacity": 18118,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Los Angeles",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 69136,
        "EventName": "Elton John",
        "MinPrice": "£38.21",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2601617",
        "MetroAreaUrl": null,
        "AvailableTickets": 4587,
        "TotalMaxDisplayTickets": 4587,
        "AvailableTicketsNumber": 4587,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at STAPLES Center Los Angeles on Wed 30 Jan 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": true,
        "IsCheapestCityContent": "Cheapest tickets in Los Angeles.",
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": true,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Jan",
            "WeekdayAndTime": "Wed 20:00",
            "DayOfMonth": "30",
            "Year": "2019",
            "Weekday": "Wed",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,118",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2585417,
        "Day": "Fri",
        "Month": "Feb",
        "Date": "01 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-01T20:00:00",
        "EndDateVal": null,
        "VenueName": "The Forum - Los Angeles",
        "VenueCapacity": 17505,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Inglewood",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 127246,
        "EventName": "Elton John",
        "MinPrice": "£49.18",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2585417",
        "MetroAreaUrl": null,
        "AvailableTickets": 6570,
        "TotalMaxDisplayTickets": 6564,
        "AvailableTicketsNumber": 6570,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at The Forum - Los Angeles Inglewood on Fri 01 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": true,
        "IsCheapestCityContent": "Cheapest tickets in Inglewood.",
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Fri 20:00",
            "DayOfMonth": "01",
            "Year": "2019",
            "Weekday": "Fri",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "17,505",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2584688,
        "Day": "Sat",
        "Month": "Feb",
        "Date": "02 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-02T20:00:00",
        "EndDateVal": null,
        "VenueName": "The Forum - Los Angeles",
        "VenueCapacity": 17505,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Inglewood",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 127246,
        "EventName": "Elton John",
        "MinPrice": "£52.21",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2584688",
        "MetroAreaUrl": null,
        "AvailableTickets": 4783,
        "TotalMaxDisplayTickets": 4779,
        "AvailableTicketsNumber": 4783,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at The Forum - Los Angeles Inglewood on Sat 02 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": true,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Sat 20:00",
            "DayOfMonth": "02",
            "Year": "2019",
            "Weekday": "Sat",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "17,505",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2728403,
        "Day": "Wed",
        "Month": "Feb",
        "Date": "06 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-06T20:00:00",
        "EndDateVal": null,
        "VenueName": "Pepsi Center - Denver",
        "VenueCapacity": 18007,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Denver",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 40383,
        "EventName": "Elton John",
        "MinPrice": "£83.23",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2728403",
        "MetroAreaUrl": null,
        "AvailableTickets": 1435,
        "TotalMaxDisplayTickets": 1435,
        "AvailableTicketsNumber": 1435,
        "IsSellingFast": true,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Pepsi Center - Denver Denver on Wed 06 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": true,
        "IsCheapestCityContent": "Cheapest tickets in Denver.",
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Wed 20:00",
            "DayOfMonth": "06",
            "Year": "2019",
            "Weekday": "Wed",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,007",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2569751,
        "Day": "Thu",
        "Month": "Feb",
        "Date": "07 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-07T20:00:00",
        "EndDateVal": null,
        "VenueName": "Pepsi Center - Denver",
        "VenueCapacity": 18007,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Denver",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 40383,
        "EventName": "Elton John",
        "MinPrice": "£138.33",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2569751",
        "MetroAreaUrl": null,
        "AvailableTickets": 578,
        "TotalMaxDisplayTickets": 578,
        "AvailableTicketsNumber": 578,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Pepsi Center - Denver Denver on Thu 07 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": true,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Thu 20:00",
            "DayOfMonth": "07",
            "Year": "2019",
            "Weekday": "Thu",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,007",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566924,
        "Day": "Sat",
        "Month": "Feb",
        "Date": "09 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-09T20:00:00",
        "EndDateVal": null,
        "VenueName": "BOK Center",
        "VenueCapacity": 19199,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Tulsa",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 77812,
        "EventName": "Elton John",
        "MinPrice": "£123.51",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566924",
        "MetroAreaUrl": null,
        "AvailableTickets": 753,
        "TotalMaxDisplayTickets": 753,
        "AvailableTicketsNumber": 753,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at BOK Center Tulsa on Sat 09 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": "Tickets for this event are almost gone.",
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Sat 20:00",
            "DayOfMonth": "09",
            "Year": "2019",
            "Weekday": "Sat",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "19,199",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566925,
        "Day": "Tue",
        "Month": "Feb",
        "Date": "12 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-12T20:00:00",
        "EndDateVal": null,
        "VenueName": "Centurylink Center",
        "VenueCapacity": 17560,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Omaha",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 105557,
        "EventName": "Elton John",
        "MinPrice": "£57.67",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566925",
        "MetroAreaUrl": null,
        "AvailableTickets": 3609,
        "TotalMaxDisplayTickets": 3609,
        "AvailableTicketsNumber": 3609,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Centurylink Center Omaha on Tue 12 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Tue 20:00",
            "DayOfMonth": "12",
            "Year": "2019",
            "Weekday": "Tue",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "17,560",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566926,
        "Day": "Wed",
        "Month": "Feb",
        "Date": "13 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-13T20:00:00",
        "EndDateVal": null,
        "VenueName": "Sprint Center",
        "VenueCapacity": 19000,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Kansas City",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 126480,
        "EventName": "Elton John",
        "MinPrice": "£172.72",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566926",
        "MetroAreaUrl": null,
        "AvailableTickets": 1504,
        "TotalMaxDisplayTickets": 1502,
        "AvailableTicketsNumber": 1504,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Sprint Center Kansas City on Wed 13 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Wed 20:00",
            "DayOfMonth": "13",
            "Year": "2019",
            "Weekday": "Wed",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "19,000",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2587214,
        "Day": "Fri",
        "Month": "Feb",
        "Date": "15 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-15T20:00:00",
        "EndDateVal": null,
        "VenueName": "Allstate Arena",
        "VenueCapacity": 18500,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Rosemont",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 127228,
        "EventName": "Elton John",
        "MinPrice": "£57.31",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2587214",
        "MetroAreaUrl": null,
        "AvailableTickets": 5252,
        "TotalMaxDisplayTickets": 5252,
        "AvailableTicketsNumber": 5252,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Allstate Arena Rosemont on Fri 15 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Fri 20:00",
            "DayOfMonth": "15",
            "Year": "2019",
            "Weekday": "Fri",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,500",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2587215,
        "Day": "Sat",
        "Month": "Feb",
        "Date": "16 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-16T20:00:00",
        "EndDateVal": null,
        "VenueName": "Allstate Arena",
        "VenueCapacity": 18500,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Rosemont",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 127228,
        "EventName": "Elton John",
        "MinPrice": "£49.63",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2587215",
        "MetroAreaUrl": null,
        "AvailableTickets": 4749,
        "TotalMaxDisplayTickets": 4749,
        "AvailableTicketsNumber": 4749,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Allstate Arena Rosemont on Sat 16 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": true,
        "IsCheapestCityContent": "Cheapest tickets in Rosemont.",
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": true,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Sat 20:00",
            "DayOfMonth": "16",
            "Year": "2019",
            "Weekday": "Sat",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "18,500",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566927,
        "Day": "Tue",
        "Month": "Feb",
        "Date": "19 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-19T20:00:00",
        "EndDateVal": null,
        "VenueName": "Fiserv Forum (Formerly Wisconsin Entertainment and Sports Center)",
        "VenueCapacity": 17500,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Milwaukee",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 126543,
        "EventName": "Elton John",
        "MinPrice": "£57.89",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566927",
        "MetroAreaUrl": null,
        "AvailableTickets": 2272,
        "TotalMaxDisplayTickets": 2272,
        "AvailableTicketsNumber": 2272,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Fiserv Forum (Formerly Wisconsin Entertainment and Sports Center) Milwaukee on Tue 19 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Tue 20:00",
            "DayOfMonth": "19",
            "Year": "2019",
            "Weekday": "Tue",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "17,500",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566928,
        "Day": "Thu",
        "Month": "Feb",
        "Date": "21 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-21T20:00:00",
        "EndDateVal": null,
        "VenueName": "Target Center",
        "VenueCapacity": 19356,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Minneapolis",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 74407,
        "EventName": "Elton John",
        "MinPrice": "£92.59",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566928",
        "MetroAreaUrl": null,
        "AvailableTickets": 1459,
        "TotalMaxDisplayTickets": 1459,
        "AvailableTicketsNumber": 1459,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Target Center Minneapolis on Thu 21 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Thu 20:00",
            "DayOfMonth": "21",
            "Year": "2019",
            "Weekday": "Thu",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "19,356",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2587216,
        "Day": "Fri",
        "Month": "Feb",
        "Date": "22 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-22T20:00:00",
        "EndDateVal": null,
        "VenueName": "Target Center",
        "VenueCapacity": 19356,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Minneapolis",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 74407,
        "EventName": "Elton John",
        "MinPrice": "£90.94",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2587216",
        "MetroAreaUrl": null,
        "AvailableTickets": 1776,
        "TotalMaxDisplayTickets": 1776,
        "AvailableTicketsNumber": 1776,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Target Center Minneapolis on Fri 22 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": true,
        "IsCheapestCityContent": "Cheapest tickets in Minneapolis.",
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": true,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Fri 20:00",
            "DayOfMonth": "22",
            "Year": "2019",
            "Weekday": "Fri",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "19,356",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566929,
        "Day": "Wed",
        "Month": "Feb",
        "Date": "27 Feb 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-02-27T20:00:00",
        "EndDateVal": null,
        "VenueName": "US Bank Arena",
        "VenueCapacity": 17556,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Cincinnati",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 43888,
        "EventName": "Elton John",
        "MinPrice": "£171.96",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566929",
        "MetroAreaUrl": null,
        "AvailableTickets": 1775,
        "TotalMaxDisplayTickets": 1775,
        "AvailableTicketsNumber": 1775,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at US Bank Arena Cincinnati on Wed 27 Feb 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": false,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Feb",
            "WeekdayAndTime": "Wed 20:00",
            "DayOfMonth": "27",
            "Year": "2019",
            "Weekday": "Wed",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "17,556",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }, {
        "EventId": 2566930,
        "Day": "Fri",
        "Month": "Mar",
        "Date": "01 Mar 2019",
        "Time": "20:00",
        "EndDate": null,
        "DateVal": "2019-03-01T20:00:00",
        "EndDateVal": null,
        "VenueName": "Times Union Center",
        "VenueCapacity": 5000,
        "VenueCapacitySliderOffset": 0,
        "VenueCity": "Albany",
        "VenueStateProvince": null,
        "VenueCountry": "USA",
        "VenueCountryCode": "US",
        "VenueConfigId": 81412,
        "EventName": "Elton John",
        "MinPrice": "£136.19",
        "EventUrl": "/Concert-Tickets/Rock-and-Pop/Elton-John-Tickets/E-2566930",
        "MetroAreaUrl": null,
        "AvailableTickets": 1391,
        "TotalMaxDisplayTickets": 1391,
        "AvailableTicketsNumber": 1391,
        "IsSellingFast": false,
        "IsDateTimeTBA": false,
        "LinkTitleText": "Elton John at Times Union Center Albany on Fri 01 Mar 2019 20:00",
        "AllowPublicPurchase": true,
        "AllowPublicListing": true,
        "OnSaleDate": null,
        "LimitedQuantityRemainingContent": null,
        "IsCheapestCity": false,
        "IsCheapestCityContent": null,
        "IsMostExpensiveInCity": false,
        "cheapestPercentageAmount": null,
        "IsRecentlyViewed": false,
        "CategoryId": 4508,
        "IsCrossListed": false,
        "IsSoldOut": true,
        "HidePrice": true,
        "IsMostLovedEvent": false,
        "HeadingTowardsLimitedStockMessage": null,
        "HeadingTowardsLimitedSupplyMessage": null,
        "UrgencyCategory": 0,
        "CityImageUrl": null,
        "IsLocalEvent": false,
        "MapPngUrl": null,
        "EmojiFlag": null,
        "IsWeekend": false,
        "VenueNotes": null,
        "RecentCategories": null,
        "EventCountdownMessage": null,
        "HasMonthlyDeal": false,
        "TransactionWithinTheLastDay": false,
        "PriceSymbolIndicator": null,
        "NewListingWithinTheLastDay": false,
        "IsMostPopularEventInVenueCityThatWeekend": false,
        "IsNextEvent": false,
        "SecondsToEvent": 0,
        "VenueHasImage": false,
        "VenueImageUrl": null,
        "IsLastDateInCity": false,
        "SoldOutTicketClasses": null,
        "BestSellingMessage": null,
        "AlreadySoldContent": null,
        "DistanceFromUser": null,
        "VenueDescription": "Medium-sized venue - great view and atmosphere",
        "CalendarViewModel": {
            "MonthName": "Mar",
            "WeekdayAndTime": "Fri 20:00",
            "DayOfMonth": "01",
            "Year": "2019",
            "Weekday": "Fri",
            "Time": "20:00",
            "FullMonthName": null,
            "FullWeekday": null
        },
        "GoogleVenueInfomationRating": null,
        "VenueCapacityString": "5,000",
        "HasGeneralAdmissionTickets": false,
        "HasSeatedTickets": false,
        "CheapestInCountryContent": null,
        "SnapshotMetrics": null,
        "OnSaleSinceMessage": null,
        "FriendlyEventCountdownMessage": null
    }]
};

/* harmony default export */ __webpack_exports__["default"] = (eventlist);

/***/ }),

/***/ "./src/ticketapp_part3.js":
/*!********************************!*\
  !*** ./src/ticketapp_part3.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _eventlist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventlist */ "./src/eventlist.js");
/* harmony import */ var _eventitem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventitem */ "./src/eventitem.js");
/* harmony import */ var vm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vm */ "./node_modules/vm-browserify/index.js");
/* harmony import */ var vm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vm__WEBPACK_IMPORTED_MODULE_2__);




class TicketApp {

    createEventList() {
        let list = document.getElementById('list');
        let events = this.eventlist.Items.map(item => {
            let event = new _eventitem__WEBPACK_IMPORTED_MODULE_1__["default"](item.Day, item.Date, item.Time, item.EventName, item.VenueName, item.VenueCity, item.MinPrice, item.IsSoldOut, item.DateVal);
            list.appendChild(event.listing);
            return event;
        });
        return events;
    };
    
    createLocationFilter() {   
        let locationFilter = document.getElementById('location-filter');
        let uniqueLocations = new Set()
        for (let item of this.eventlist.Items) {
            let loc = document.createElement('option');
            loc.value = item.VenueCity;
            loc.innerHTML = item.VenueCity;
            if (!uniqueLocations.has(item.VenueCity)) {
                uniqueLocations.add(item.VenueCity);
                locationFilter.appendChild(loc);
            };
        };
    };

    addFilter(filterType) {
        this.filters.add(filterType);
        this.filterTypes[filterType].call(this);
    }

    redoFilter() {
        this.resetFilter(this.events);
        this.runFilters();
    }

    removeFilter(filterType) {
        this.filters.delete(filterType);
        this.resetFilter(this.events);
        this.runFilters();
    }

    runFilters() {
        for (let filter of this.filters) {
            this.filterTypes[filter].call(this);
        };
    };

    filterLocation() {
        this.events.forEach(event => {
            if (event.city !== this.location) {
                event.listing.style.display = "none";
            };
        });
    };

    filterAvailability() {
        this.events.forEach(event => {
            if (event.isSoldOut) event.listing.style.display = "none";
        })
    };

    filterPrice() {
        this.minPrice = this.minPrice || 0;
        this.maxPrice = this.maxPrice || Number.MAX_SAFE_INTEGER;
        this.events.forEach(event => {
            if (event.price <= this.minPrice || event.price >= this.maxPrice) event.listing.style.display = "none";
        });
    };

    filterDate() {
        this.startDate = this.startDate || "2018-01-01";
        this.endDate = this.endDate || "2019-12-31";
        this.events.forEach(event => {
            const date = Date.parse(event.dateVal.slice(0,10));
            debugger
            if (Date.parse(this.startDate) > date || Date.parse(this.endDate) < date) event.listing.style.display = "none";
        });
    };

    createEventListeners() {
        
        let clearAll = document.getElementById('clear-all');
        let clearPrice = document.getElementById('clear-price');
        let clearLocation = document.getElementById('clear-location');
        let clearDate = document.getElementById('clear-date');
        
        let locationFilter = document.getElementById('location-filter');
        let available = document.getElementById('availability');
        let checkbox = document.getElementById('checkbox');

        let min = document.getElementById('min-price');
        let max = document.getElementById('max-price');

        let startDate = document.getElementById('start-date');
        let endDate = document.getElementById('end-date');

        
        clearAll.addEventListener('click', () => {
            this.resetFilter(this.events);
            locationFilter.value = "";
            checkbox.checked = true;
            min.value = "";
            max.value = "";
            startDate.value = "";
            endDate.value = "";
        });
        
        clearPrice.addEventListener('click', () => {
            this.removeFilter('price');
            min.value = "";
            max.value = "";
        });
        
        clearLocation.addEventListener('click', () => {
            this.removeFilter('location');
            locationFilter.value = ""
        });
        
        clearDate.addEventListener('click', () => {
            this.removeFilter('date');
            startDate.value = "";
            endDate.value = "";
        });
        
        locationFilter.addEventListener('change', e => {
            this.location = e.target.value;
            (this.filters.has('location')) ? this.redoFilter() : this.addFilter('location');
        });

        available.addEventListener('click', () => {
            (checkbox.checked) ? this.addFilter('availability') : this.removeFilter('availability');
        });

        min.addEventListener('change', e => {
            this.minPrice = e.target.value;
            (this.filters.has('price')) ? this.redoFilter() : this.addFilter('price');
        });
        max.addEventListener('change', e => {
            this.maxPrice = e.target.value;
            (this.filters.has('price')) ? this.redoFilter() : this.addFilter('price');
        });

        startDate.addEventListener('change', e => {
            this.startDate = e.target.value;
            (this.filters.has('date')) ? this.redoFilter() : this.addFilter('date')
        });
        endDate.addEventListener('change', e => {
            this.endDate = e.target.value;
            (this.filters.has('date')) ? this.redoFilter() : this.addFilter('date')
        });
    };

    resetFilter(events) {
        events.forEach(event => {
            event.listing.style.display = "flex";
        });
    };

    filterFunctions() {
        this.filterTypes = {
            'location': function() { this.filterLocation() },
            'availability': function() { this.filterAvailability() },
            'price': function() { this.filterPrice() },
            'date': function() { this.filterDate() }
        };
    };

    startApp() {
        this.filters = new Set();
        this.filterFunctions();
        this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
        this.events = this.createEventList();
        this.currentFilteredEvents = this.events;
        this.createEventListeners();
        this.createLocationFilter();
    };
};

var application = new TicketApp();
document.addEventListener('DOMContentLoaded', application.startApp());



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map