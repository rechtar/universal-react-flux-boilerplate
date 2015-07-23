import { Store } from 'flummox';

class DemoStore extends Store {
    constructor(flux) {
        super();

        const demoActions = flux.getActions('demo');

        this.register(demoActions.requestItems, this._handleRequestItems);

        this.state = this._getInitialState();
    }

    _getInitialState() {
        return {
            items: null
        };
    }

    _handleRequestItems(items) {
        this.setState({ items });
    }

    static serialize(state) {
        return JSON.stringify(state);
    }

    static deserialize(state) {
        try {
            return JSON.parse(state);
        } catch (err) {
            // do nothing
        }
    }
}

export default DemoStore;
