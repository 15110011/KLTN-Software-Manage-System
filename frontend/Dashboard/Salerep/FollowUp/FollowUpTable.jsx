import * as React from 'react'
import { withStyles, Typography, MenuItem, Select, IconButton, Grid } from '@material-ui/core';
import MaterialTable from 'material-table'
import MTableBody from 'material-table/dist/m-table-body'
import MTableHeader from 'material-table/dist/m-table-header'
import TablePagination from '@material-ui/core/TablePagination'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core'
import * as dateFns from 'date-fns'

import { EVENTS_URL, CONTACT_MARKETING_URL, ORDER_URL } from '../../../common/urls';

import styles from '../SalerepStyles.js'
import { EVENTS_URL, GROUP_URL } from '../../../common/urls';
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import CreateEventDialog from '../../../Events/CreateEventDialog'
import CardBody from "../../../components/Card/CardBody";
// import CustomFItlerRow from '../../../components/CustomFilterRow'

import USERCONTEXT from '../../../components/UserContext'
import { apiGet, apiPost } from '../../../common/Request'
import useFetchData from '../../../CustomHook/useFetchData'
import { spawn } from 'child_process';
// import TicketDetail from './TicketDetail'

let flSearch = {
}

let activePage = 0

function FollowUpTable(props) {

    const { classes, forceActivities, tableRef, history } = props

    // const [viewType, setViewType] = React.useState('campaign')

    // const [createEventDialog, setCreateEventDialog] = React.useState(false)

    const [openDialog, setOpenDialog] = React.useState(false)

    const [moreRow, setMoreRow] = React.useState(null)
    const [deletingRow, setDeletingRow] = React.useState(null)
    const [movingRow, setMovingRow] = React.useState(null)



    const [moreDialog, setMoreDialog] = React.useState(false)

    // const [groups, setGroups, setUrl] = useFetchData(GROUP_URL, null, { data: [], total: 0 })
    // const [timeRanges, setTimeRanges] = React.useState([null, null, null, null, null, { from: null, to: null }])
    //Activity


    const flOrder = []


    return (

        <USERCONTEXT.Consumer>
            {({ user }) =>
                <>
                    {openDialog && moreRow &&
                        <Dialog
                            open={true}
                            onClose={() => setOpenDialog(false)}
                            maxWidth="lg"
                            fullWidth
                        >
                            <DialogTitle>
                                <h4>
                                    Manage Contact
                </h4>
                            </DialogTitle>
                            <DialogContent>
                                {/* <TicketDetail
                  histories={moreRow.histories}
                  allHistories={moreRow.histories}
                  campaign={moreRow.campaign} contact={moreRow.contact}
                  id={moreRow.id}
                  contact={moreRow.contact}
                  updateTable={tableActivtyRef.current.onQueryChange}
                  updateActivities={forceActivities}
                  marketing={moreRow.marketing}
                  user={user}
                  getMoreRow={getMoreRow}
                /> */}
                            </DialogContent>
                        </Dialog>
                    }
                    <MaterialTable
                        tableRef={tableRef}
                        components={
                            {
                                Header: props => <MTableHeader {...props}
                                    onOrderChange={(orderBy, dir) => {
                                        flOrder.forEach((order, index) => {
                                            if (orderBy != index) {
                                                flOrder[index] = null
                                            }
                                        })
                                        flOrder[orderBy] = dir

                                        props.onOrderChange(orderBy, dir)
                                    }}
                                />,
                                Body: props => <MTableBody {...props} onFilterChanged={(columnId, value) => {
                                    console.log(value)
                                    if (columnId == 1) {
                                        flSearch.fname = value
                                    }
                                    else if (columnId == 2) {
                                        flSearch.email = value
                                    }
                                    else if (columnId == 3) {
                                        flSearch.phone = value
                                    }
                                    else if (columnId == 4) {
                                        flSearch.campaign = value
                                    }
                                    else if (columnId == 5) {
                                        flSearch.noSteps = value
                                    }
                                    activePage = 0
                                    props.onFilterChanged(columnId, value);
                                }}
                                />,
                                Toolbar: props =>
                                    <>
                                        <Card plain>
                                            <CardHeader color="warning">
                                                <h4 onClick={() => history.push('/dashboard/follow-up-detail')} style={{ cursor: 'pointer' }} className={classes.cardTitleWhite}>Follow-up</h4>
                                            </CardHeader>
                                        </Card>
                                    </>
                                ,
                                Pagination: props => <TablePagination {...props}
                                    page={activePage} rowsPerPageOptions={[5, 10, 20]}
                                    count={props.count}
                                    onChangePage={(e, nextPage) => {
                                        props.onChangePage(a, nextPage)
                                        // setActivePage(nextPage)
                                        activePage = nextPage
                                    }}
                                />

                            }
                        }
                        columns={[
                            { title: '#', field: '#', headerStyle: { maxWidth: '0px' }, filtering: false, sorting: false },
                            { title: 'Name', field: 'fname' },
                            {
                                title: 'Email', field: 'email'
                            },
                            {
                                title: 'Phone', field: 'phone', sorting: false
                            },
                            {
                                title: 'Campaign', field: 'campaignName',
                            },
                            {
                                title: 'No. Steps', field: 'noSteps', type: 'numeric'
                            },
                            {
                                title: 'Progress', field: 'progress',
                                filtering: false, type: 'numeric',
                                render: rowData => {
                                    if (rowData.progress < 50) { return <span className='text-danger'>{rowData.progress.toFixed(2) + '%'}</span> }
                                    return <span className='text-success'>{rowData.progress.toFixed(2) + '%'}</span>
                                }
                            },
                        ]}
                        data={(query) => {

                            return new Promise((resolve, reject) => {
                                let searchString = `${flSearch.fname ? '&contact_name=' + flSearch.fname : ''}`
                                searchString += `${flSearch.email ? '&email=' + flSearch.email : ''}`
                                searchString += `${flSearch.phone ? '&phone=' + flSearch.phone : ''}`
                                searchString += `${flSearch.campaign ? '&campaign=' + flSearch.campaign : ''}`
                                searchString += `${flSearch.noSteps ? '&no_steps=' + flSearch.noSteps : ''}`
                                searchString += `${flOrder[1] ? '&contact_order=' + flOrder[1] : ''}`
                                searchString += `${flOrder[2] ? '&email_order=' + flOrder[2] : ''}`
                                searchString += `${flOrder[4] ? '&camapign_order=' + flOrder[4] : ''}`
                                searchString += `${flOrder[5] ? '&no_steps_order=' + flOrder[5] : ''}`
                                searchString += `${flOrder[6] ? '&progress_order=' + flOrder[6] : ''}`

                                apiGet(ORDER_URL + `?page=${activePage}&limit=${query.pageSize}` + searchString + query.search, true).then(res => {
                                    const data = res.data.data.map((d, index) => {
                                        const noSteps = d.campaign.follow_up_plan.steps.length
                                        const progress = (d.step_details.reduce((acc, s) => {
                                            if (s.status == 'COMPLETED')
                                                acc += 1
                                            return acc
                                        }, 0) / noSteps * 100)
                                        return {
                                            '#': query.pageSize * activePage + index + 1,
                                            fname: d.contacts.first_name + ' ' + d.contacts.last_name,
                                            phone: d.contacts.phone,
                                            email: d.contacts.mail,
                                            campaignName: d.campaign.name,
                                            noSteps,
                                            progress,
                                            id: d.id
                                        }
                                    })

                                    resolve({
                                        data,
                                        page: res.data.page,
                                        totalCount: res.data.total
                                    })

                                })
                            })
                        }}
                        actions={[
                            {
                                icon: 'remove',
                                tooltip: 'Fail this Contact',
                                onClick: (event, row) => {
                                    setDeletingRow(row)
                                },
                            },
                            {
                                icon: 'done',
                                tooltip: 'Confirm Deal',
                                onClick: (event, row) => {
                                    setMovingRow(row)
                                },
                                disabled: row => row.progress != 100
                            },
                            {
                                icon: 'more_vert',
                                tooltip: 'More actions',
                                onClick: (event, row) => {
                                    setMoreRow(row)
                                    setMoreDialog(true)
                                },
                            },
                        ]}
                        options={{
                            search: false,
                            filtering: true,
                            paging: true,
                            debounceInterval: 300,
                            actionsColumnIndex: -1
                        }}
                    />
                </>
            }
        </USERCONTEXT.Consumer>
    )

}

export default withStyles(styles)(FollowUpTable)