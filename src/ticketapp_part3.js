import eventlist from './eventlist'
import EventItem from './eventitem'

class TicketApp {

    createEventList() {
        let list = document.getElementById('list');
        let events = this.eventlist.Items.map(item => {
            let event = new EventItem(item.Day, item.Date, item.Time, item.EventName, item.VenueName, item.VenueCity, item.MinPrice, item.IsSellingFast, item.IsSoldOut);
            list.appendChild(event.listing);
            return event;
        });
        return events
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
        debugger
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
    }

    filterPrice(price) {
        this.events.forEach(event => {
            if (event.price > price) event.listing.style.display = "none";
        })
        this.lastPrice = price
    }

    createEventListeners() {
        let locationFilter = document.getElementById('location-filter');
        locationFilter.addEventListener('change', e => {
            this.location = e.target.value;
            this.addFilter('location')
        });
        
        const clearAll = document.getElementById('clear-filter');
        clearAll.addEventListener('click', () => {
            this.resetFilter(this.events);
            locationFilter.value = "";
        });
        
        let available = document.getElementById('availability')
        let checkbox = document.getElementById('checkbox')
        available.addEventListener('click', () => {
            if (checkbox.checked) {
                this.addFilter('availability');
            } else {
                this.removeFilter('availability');
            };
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
            'price': function() { this.filterPrice() }
        }
    }

    startApp() {
        this.filters = new Set();
        this.filterFunctions();
        this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
        this.events = this.createEventList();
        this.createEventListeners();
        this.createLocationFilter();
    }
};

var application = new TicketApp();
document.addEventListener('DOMContentLoaded', application.startApp());

