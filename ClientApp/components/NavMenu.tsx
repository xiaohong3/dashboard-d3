import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>dashboard_d3</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/sending-rate' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Sending rate
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/sending-rate-by-build' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Sending rate by build
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/media-type' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Media type
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
