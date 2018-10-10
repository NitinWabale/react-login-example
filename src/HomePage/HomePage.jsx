import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TokenModal } from './TokenModal'
import { tokenActions } from '../_actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { token : this.props.token};
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            token: nextProps.token,
        });
      }
    componentDidMount() {
        this.props.dispatch(tokenActions.all());
    }
    handleClick(event) {
        const tokens = this.props.token.items;
        const searchterm = this.refs.search.value.toLowerCase();
        const items = tokens.filter(function(item){
            return item.creator.toLowerCase().search(searchterm) !== -1;
          });
          this.setState({token: { items}});
    }
    handleTokenRevoke(id, status) {
        return (e) => this.props.dispatch(tokenActions.revoke(id, status));
    }
    render() {
        const { user } = this.props;
        const { token } = this.state;
        return (
            <div>
                <h1>Hi {user.firstName}!</h1>
                <div>
                    <input ref="search" type="search" placeholder="Search criteria" />
                    <button onClick={e => this.handleClick(e)}>Search</button>
                </div>
                <div style={{ marginLeft: "950px", marginTop: "50px" }}><Link to="/login">Logout</Link></div>
                <div style={{ marginTop: "-20px" }}>
                    <TokenModal
                        {... this.props}
                    />
                </div>
                {token && token.loading && <em>Loading tokens...</em>}
                {token && token.error && <span className="text-danger">ERROR: {tokens.error}</span>}
                {
                    <table border='1' bordercolor='black' style={{ marginTop: "30px", width: "1000px" }}>
                        <thead>
                            <tr>
                                <th class="col-3">
                                    <span>Id</span>
                                </th>
                                <th class="col-collapse col-3">
                                    <span>Token</span>
                                </th>
                                <th>
                                    <span>Creator</span>
                                </th>
                                <th><span>Expiry</span></th>
                                <th><span>Status</span></th>
                                <th><span>Revoke/Enable</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {token && token.items && token.items.map((token, index) =>
                                <tr>
                                    <td><span>{token.id}</span></td>
                                    <td><span>{token.key_name}</span></td>
                                    <td><span>{token.creator}</span></td>
                                    <td><span>{token.expiry}</span></td>
                                    <td><span>{token.status}</span></td>
                                    <td><span>{
                                        token.revoking ? <em> - Updating...</em>
                                            : token.revokeError ? <span className="text-danger"> - ERROR: {token.revokeError}</span>
                                                : <span>
                                                    { token.status === 'Active' ?
                                                    <a onClick={this.handleTokenRevoke(token.id, 'InActive')}>Revoke</a>
                                                    : <a onClick={this.handleTokenRevoke(token.id, 'Active')}>Enable</a>
                                                    }
                                             </span>
                                    }</span></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, token } = state;
    const { user } = authentication;
    return {
        user,
        users,
        token
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };