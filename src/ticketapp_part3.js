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

    filterLocation(location) {
        this.undoFilter(this.prevLocation, 'location')
        if (location) {
            this.events.forEach(event => {
                if (event.city !== location) {
                    event.listing.style.display = "none";
                };
            });
        };
        this.prevLocation = location;
    };

    filterAvailability() {

    }

    
    createEventListeners() {
        let locationFilter = document.getElementById('location-filter');
        locationFilter.addEventListener('change', e => this.filterLocation(e.target.value));
        
        const clearAll = document.getElementById('clear-filter');
        clearAll.addEventListener('click', () => {
            this.resetFilter(this.events);
            locationFilter.value = "";
        });
        
        let available = document.getElementById('availability')
        let checkbox = document.getElementById('checkbox')
        available.addEventListener('click', () => {
            if (checkbox.checked) {
                
            }
        })
    };

    undoFilter(value, filter) {
        if (filter === 'location') {
            this.events.forEach(event => {
                debugger
                if (event.city !== value) {
                    event.listing.style.display = "flex";
                };
            });
        } else if (filter === 'availability') {

        }
    };

    resetFilter(events) {
        events.forEach(event => {
            event.listing.style.display = "flex";
        });
    };

    startApp() {
        this.eventlist = _eventlist__WEBPACK_IMPORTED_MODULE_0__.default;
        this.events = this.createEventList();
        this.createEventListeners();
        this.createLocationFilter();
    }
};

var application = new TicketApp();
document.addEventListener('DOMContentLoaded', application.startApp());

