import React, { useEffect, useState, useMemo } from "react";
import SideBar from "../../../Components/Bar/SideBar";
import TopBar from "../../../Components/Bar/TopBar";
import callApi from "../../../utils/apiCaller";
import { getTokenEmployee } from "../../../actions/getNV";
import { formatDate } from "../../../utils/formatDate";
import ReactDatePicker from "react-datepicker";
import Chart from "./Chart";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import NavigationSwitchPageStatistic from '../../../Components/Navigation/NavigationSwitchPageStatistic'
import { saveAs } from 'file-saver'
import NumberFormat from 'react-number-format'
const XLSX = require('xlsx');
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};
const MySwal = withReactContent(Swal)
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')';
}


export default function App() {
    const [year, setYear] = useState(2022)

    const [methodStatistic, setMethodStatistic] = useState("thang")

    const [labelList, setLabelList] = useState([])

    const [revenue, setRevenue] = useState('')
    const [data, setData] = useState({})
    const [isDisplay, setIsDisplay] = useState(false)
    const [dateStatistic, setDateStatistic] = useState({
        dateStart: new Date(),
        dateEnd: new Date()
    })
    const [labelMethod, setLabelMethod] = useState("Năm")
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const monthList = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

    useEffect(() => {
        if (revenue !== '' && revenue.length !== 0) {// && labelList.length > 0
            var color = []
            for (let index = 0; index < revenue.length; index++) {
                color.push(`${random_rgba()}`)
            }
            setData({
                labels: labelList.splice(0, revenue.length),
                datasets: [{
                    label: 'Doanh thu',
                    data: revenue,
                    backgroundColor: color,
                    borderColor: color,
                    borderWidth: 1,
                }]
            })
        }// eslint-disable-next-line
    }, [revenue])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (methodStatistic === 'ngay') {
            const result = await callApi(`statistic/revenue/date?date-start=${dateStatistic.dateStart.getTime()}&date-end=${dateStatistic.dateEnd.getTime()}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                if (res != null) {
                    return res.data
                }
            });
            if (result) {
                if (result.result === false) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: result.message
                    })
                    return
                }

                const arrayListLabel = []
                const temp = JSON.parse(JSON.stringify(dateStatistic))
                for (let d = new Date(temp.dateStart); d <= new Date(temp.dateEnd); d.setDate(d.getDate() + 1)) {
                    const strDate = formatDate(d)
                    arrayListLabel.push(strDate)
                }

                setLabelList(arrayListLabel)

                setRevenue(result)
                console.log(arrayListLabel)
                console.log(result)
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Không thể thống kê vui lòng kiểm tra lại máy chủ"
                })
                return
            }

        } else if (methodStatistic === 'thang') {

            const result = await callApi(`statistic/revenue/month?year=${year}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                if (res != null) {
                    return res.data
                }
            });
            if (result) {
                console.log(result)
                setLabelList(monthList)
                setRevenue(result)
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: "Không thể thống kê vui lòng kiểm tra lại máy chủ"
                })
                return
            }

        }

        setIsDisplay(true)
    }

    const renderByMethodStatistic = () => {
        if (methodStatistic === "thang") {
            return <>
                <div className="form-group">
                    <label htmlFor="">Năm:&nbsp;&nbsp;</label>
                    <select name="dataTable_length" aria-controls="dataTable"
                        onChange={e => setYear(parseInt(e.target.value))}
                        value={year}
                        className="custom-select custom-select-sm form-control form-control-sm"
                        style={{ width: 150 }}>

                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
            </>
        } else {
            return <>
                <div className="form-group col-md-4">
                    <label value={dateStatistic.dateStart} className=" control-label">Ngày bắt đầu</label>
                    <ReactDatePicker
                        selected={dateStatistic.dateStart}
                        name="NGAYDB"
                        className="form-control"
                        onChange={date => setDateStatistic({ ...dateStatistic, dateStart: date })} //only when value has changed
                    />
                </div>
                <div className="form-group col-md-4">
                    <label value={dateStatistic.dateEnd} className=" control-label">Ngày kết thúc</label>
                    <ReactDatePicker
                        selected={new Date(dateStatistic.dateEnd)}
                        name="NGAYDB"
                        className="form-control"
                        onChange={date => setDateStatistic({ ...dateStatistic, dateEnd: date })} //only when value has changed
                    />
                </div>
            </>
        }
    }
    
    useEffect(() => {
        if (methodStatistic === 'nam') {
            setLabelMethod("Năm")
        } else if (methodStatistic === 'thang') {
            setLabelMethod("Tháng")
        } else {
            setLabelMethod("Ngày")
        }
    }, [methodStatistic])
    const [pages, setPages] = useState(1)
    var revenueList = revenue && revenue.map((item, index) => {
        if (methodStatistic === 'thang') {
            return (
                <tr>
                    <td> {monthList[index]}</td>
                    <td><NumberFormat displayType="text" thousandSeparator={true} value={item}  /></td>
                </tr>
            )
        } else {
            const arrayListLabel = []
            const temp = JSON.parse(JSON.stringify(dateStatistic))
            for (let d = new Date(temp.dateStart); d <= new Date(temp.dateEnd); d.setDate(d.getDate() + 1)) {
                const strDate = formatDate(d)
                arrayListLabel.push(strDate)
            }
            if (index >= (pages - 1) * 10 && index < pages * 10) {
                return (
                    <tr>
                        <td>{arrayListLabel[index]}</td>
                        <td><NumberFormat displayType="text" thousandSeparator={true} value={item}  /></td>
                    </tr>
                )
            }

        }

    })
    function saveAsExcel(buffer, filename) {
        const data = new Blob([buffer], { type: EXCEL_TYPE });

        saveAs(data, filename + '_export_' + new Date().getTime() + EXCEL_EXTENSION)
    }
    const handleDownload = (e) => {
        var dataSet = []
        revenue && revenue.map((item, index) => {
            if (methodStatistic === 'thang') {
                const object = {
                    "Tháng": monthList[index],
                    "Doanh thu": item
                }
                dataSet.push(object)
            }
            else {
                const arrayListLabel = []
                const temp = JSON.parse(JSON.stringify(dateStatistic))
                for (let d = new Date(temp.dateStart); d <= new Date(temp.dateEnd); d.setDate(d.getDate() + 1)) {
                    const strDate = formatDate(d)
                    arrayListLabel.push(strDate)
                }
                const object = {
                    "Ngày": arrayListLabel[index],
                    "Doanh thu": item
                }
                dataSet.push(object)
            }
        })

        const worksheet = XLSX.utils.json_to_sheet(dataSet);
        const workbook = {
            Sheets: {
                'data': worksheet
            },
            SheetNames: ['data']
        };
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

        saveAsExcel(excelBuffer, 'profit');
    }
    const tableDataRevenue = useMemo(() => {
        return (
            <div className="card-body" style={{ padding: 70, marginLeft: 47 }}>
                <div className="table table-bordered table-striped mb-0">
                    <table className="table table-bordered table-striped mb-0" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="col-md-1">{labelMethod}</th>

                                <th className="col-md-3">Doanh thu</th>

                            </tr>
                        </thead>

                        <tbody>
                            {revenueList}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={handleDownload} style={{
                            marginBottom: 100,
                            marginRight: 110,
                            right: 0,
                            bottom: 0,
                            width: 100,
                            position: "absolute",
                        }}
                        >Export</button>
                    </div>
                </div>
            </div>)

    })

    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar />
                    <div className="py-3 mb-20" >
                        <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                            Thống Kê Doanh Thu
                        </h3>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="form-group col-md-6">
                            <label htmlFor="">Thống kê doanh thu theo:</label>
                            <select name="dataTable_length" aria-controls="dataTable"
                                onChange={e => setMethodStatistic(e.target.value)}
                                value={methodStatistic}
                                className="custom-select custom-select-sm form-control form-control-sm"
                                style={{ width: 150 }}>

                                <option value="thang">Tháng</option>
                                <option value="ngay">Ngày</option>
                            </select>
                        </div>

                        <div style={{ marginRight: 200 }}>
                            <form onSubmit={(e) => handleSubmit(e)} >
                                <div className="form-row d-flex justify-content-end">
                                    {renderByMethodStatistic()}
                                    <div className="form-group col-md-2">
                                        <button className="btn btn-primary" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                    {/* <Line data={data} style={{ padding: 50 }} /> */}
                    {isDisplay && <Chart data={data} options={options} />}
                    <div>
                        {isDisplay && tableDataRevenue}
                        {isDisplay && <NavigationSwitchPageStatistic entries={revenue.length} onReceivePage={p => setPages(p)} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
