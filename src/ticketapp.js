import eventlist from './eventlist'
import EventItem from './eventitem'

class TicketApp {

    // creates an Array of EventItems
    createEventList() {
        let list = document.getElementById('list');
        let events = this.eventlist.Items.map(item => {
            let event = new EventItem(item.Day, item.Date, item.Time, item.EventName, item.VenueName, item.VenueCity, item.MinPrice, item.IsSoldOut, item.DateVal);
            list.appendChild(event.listing);
            return event;
        });
        return events;
    };
    
    // creates the dropdown menu, which users can select a location to filter by
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

    // adds the type of filter into the set of existing filters, and executes that filter
    addFilter(filterType) {
        this.filters.add(filterType);
        this.filterTypes[filterType].call(this);
    }

    // when an existing filter has been changed, you reset all events to show, then re-run the filters
    redoFilter() {
        this.resetFilter(this.events);
        this.runFilters();
    }

    // when an existing filter has been moved, you reset all events to show, then re-run the remaining filters
    removeFilter(filterType) {
        this.filters.delete(filterType);
        this.resetFilter(this.events);
        this.runFilters();
    }

    // this.filters stores strings that represent the filters and this executes those filters
    runFilters() {
        for (let filter of this.filters) {
            this.filterTypes[filter].call(this);
        };
    };


    // filter by location
    filterLocation() {
        let currentFilter = []
        this.allFilteredEvents.forEach(event => {
            (event.city !== this.location) ? event.listing.style.display = "none" : currentFilter.push(event)
        });
        this.allFilteredEvents = currentFilter;
    };

    // filter by availability
    filterAvailability() {
        let currentFilter = []
        this.allFilteredEvents.forEach(event => {
            (event.isSoldOut) ? event.listing.style.display = "none" : currentFilter.push(event)
        });
        this.allFilteredEvents = currentFilter;
    };

    // filter by price
    filterPrice() {
        let currentFilter = []
        this.minPrice = this.minPrice || 0;
        this.maxPrice = this.maxPrice || Number.MAX_SAFE_INTEGER;
        this.allFilteredEvents.forEach(event => {
            (event.price <= this.minPrice || event.price >= this.maxPrice) ? event.listing.style.display = "none" : currentFilter.push(event)
        });
        this.allFilteredEvents = currentFilter;
    };

    // filter by date
    filterDate() {
        let currentFilter = []
        this.startDate = this.startDate || "2018-01-01";
        this.endDate = this.endDate || "2019-12-31";
        this.allFilteredEvents.forEach(event => {
            const date = Date.parse(event.dateVal.slice(0,10));
            (Date.parse(this.startDate) > date || Date.parse(this.endDate) < date) ? event.listing.style.display = "none" : currentFilter.push(event)
        });
        this.allFilteredEvents = currentFilter;
    };


    // adding all event listeners that allow for adding/deleting filters
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
            this.filters = new Set();
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

    // does not wipe the list of filters, it only resets the list of events and redisplays them, 
    // an eventlistener to clearAll removes the existing filters
    resetFilter(events) {
        this.allFilteredEvents = events;
        events.forEach(event => {
            event.listing.style.display = "flex";
        });
    };

    // the functions for executing filters are stored in a hash
    filterFunctions() {
        this.filterTypes = {
            'location': function() { this.filterLocation() },
            'availability': function() { this.filterAvailability() },
            'price': function() { this.filterPrice() },
            'date': function() { this.filterDate() }
        };
    };

    // initiates the application
    startApp() {
        this.filters = new Set();
        this.filterFunctions();
        this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
        this.events = this.createEventList();
        this.allFilteredEvents = this.events;
        this.createEventListeners();
        this.createLocationFilter();
    };
};

var application = new TicketApp();
document.addEventListener('DOMContentLoaded', application.startApp());

