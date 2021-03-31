import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Master from './master';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Routes from './routes';
import { MemoryRouter as Router, Link } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import '@babel/polyfill';

describe('Master', () => {

    let wrapper;
  
    before(() => {

        let mock = new MockAdapter(axios);

        // for simulating network error
        mock.onGet('/api/book').networkErrorOnce();

        wrapper = mount(
            <Router>
                <Master />
            </Router>);
    });

    it('should render an AppBar', () => {
        expect(wrapper.find(AppBar)).to.have.lengthOf(1);
    });

    it('should render a Drawer', () => {
        expect(wrapper.find(Drawer)).to.have.lengthOf(1);
    });

    it('opens Drawer as default', () => {
        const drawer = wrapper.find(Drawer);
        expect(drawer.props().open).is.equal(true);
    });

    it('should render Link Elements up to number of route definition', () => {
        expect(wrapper.find(Link)).to.have.lengthOf(Routes.length);
    });

    it('should handle Drawer open and close', () => {
        const openDrawerMenuIcon = wrapper.find('[aria-label="Open drawer"]').find(IconButton);
        const closeDrawerMenuIcon = wrapper.find('[aria-label="Close drawer"]').find(IconButton);

        closeDrawerMenuIcon.simulate('click');
        const drawer = wrapper.find(Drawer);
        expect(drawer.props().open).is.equal(false)

        openDrawerMenuIcon.simulate('click');
        const drawer2 = wrapper.find(Drawer);
        expect(drawer2.props().open).is.equal(true)
    });
    
    it('should change selectedIndex when clickling link buttons in drawer', () => {
        let listItems = wrapper.find(ListItem);  
        expect(listItems.at(0).props().selected).is.equal(true);
        expect(listItems.at(1).props().selected).is.equal(false);
        expect(listItems.at(2).props().selected).is.equal(false);
        
        listItems.at(1).simulate('click');
        listItems = wrapper.find(ListItem);  
        expect(listItems.at(0).props().selected).is.equal(false);
        expect(listItems.at(1).props().selected).is.equal(true);
        expect(listItems.at(2).props().selected).is.equal(false);

        listItems.at(2).simulate('click');
        listItems = wrapper.find(ListItem);  
        expect(listItems.at(0).props().selected).is.equal(false);
        expect(listItems.at(1).props().selected).is.equal(false);
        expect(listItems.at(2).props().selected).is.equal(true);

        listItems.at(0).simulate('click');
        listItems = wrapper.find(ListItem);  
        expect(listItems.at(0).props().selected).is.equal(true);
        expect(listItems.at(1).props().selected).is.equal(false);
        expect(listItems.at(2).props().selected).is.equal(false);
    });
});