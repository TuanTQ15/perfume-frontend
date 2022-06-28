import React from 'react'
import { connect } from 'react-redux'

export const Item = (props) => {
    return (
        <tr>
            <th scope="row">
                <div className="media align-items-center">
                    <a href="/#" className="avatar rounded-circle mr-3">
                        <img alt="" src="../assets/img/theme/angular.jpg" />
                    </a>
                    <div className="media-body">
                        <span className="name mb-0 text-sm">Angular Now UI Kit PRO</span>
                    </div>
                </div>
            </th>
            <td className="budget">
                $1800 USD
            </td>
            <td>
                <span className="badge badge-dot mr-4">
                    <i className="bg-success"></i>
                    <span className="status">completed</span>
                </span>
            </td>
            <td>
                <div className="avatar-group">
                    <a href="/#" className="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                        data-original-title="Ryan Tompson">
                        <img alt="" src="../assets/img/theme/team-1.jpg" />
                    </a>
                    <a href="/#" className="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                        data-original-title="Romina Hadid">
                        <img alt="" src="../assets/img/theme/team-2.jpg" />
                    </a>
                    <a href="/#" className="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                        data-original-title="Alexander Smith">
                        <img alt="" src="../assets/img/theme/team-3.jpg" />
                    </a>
                    <a href="/#" className="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                        data-original-title="Jessica Doe">
                        <img alt="" src="../assets/img/theme/team-4.jpg" />
                    </a>
                </div>
            </td>
            <td>
                <div className="d-flex align-items-center">
                    <span className="completion mr-2">100%</span>
                    <div>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow="100"
                                aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}></div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="text-right">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-light" href="/#" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <a className="dropdown-item" href="/#">Action</a>
                        <a className="dropdown-item" href="/#">Another action</a>
                        <a className="dropdown-item" href="/#">Something else here</a>
                    </div>
                </div>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Item)
