import React, { useEffect, useState } from "react";
import SideBar from "../../../Components/Bar/SideBar";
import TopBar from "../../../Components/Bar/TopBar";
import callApi from "../../../utils/apiCaller";
import { getTokenEmployee } from "../../../actions/getNV";
import { formatDate } from "../../../utils/formatDate";
import ReactDatePicker from "react-datepicker";
import ChartProfit from "./ChartProfit";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
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
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')';
}


export default function App() {
    const [year, setYear] = useState(2022)

    const [methodStatistic, setMethodStatistic] = useState("nam")

    const [labelList, setLabelList] = useState([])

    const [revenue, setRevenue] = useState('')
    const [isDisplay, setIsDisplay] = useState(false)
    const [data, setData] = useState({})

    const [dateStatistic, setDateStatistic] = useState({
        dateStart: new Date(),
        dateEnd: new Date()
    })

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
                    label: 'Lợi nhuận',
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
            const result = await callApi(`statistic/profit/date?date-start=${dateStatistic.dateStart.getTime()}&date-end=${dateStatistic.dateEnd.getTime()}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                return res.data
            });
            console.log(result)
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
            console.log(arrayListLabel)
            setLabelList(arrayListLabel)
            setRevenue(result)
        } else {
            const result = await callApi(`statistic/profit/year?year=${year}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                return res.data
            });
            console.log(result)
            setLabelList(monthList)
            setRevenue(result)
        }
        setIsDisplay(true)
    }

    const renderByMethodStatistic = () => {
        if (methodStatistic === "nam") {
            return <>
                <div className="form-group">
                    <label htmlFor="">Năm:&nbsp;&nbsp;</label>
                    <select name="dataTable_length" aria-controls="dataTable"
                        onChange={e => setYear(parseInt(e.target.value))}
                        value={year}
                        className="custom-select custom-select-sm form-control form-control-sm"
                        style={{ width: 150 }}>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
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
    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar />
                    <div className="py-3 mb-20" >
                        <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                            Thống Kê Lợi Nhuận
                        </h3>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div className="form-group col-md-6">
                            <label htmlFor="">Thống kê lợi nhuận theo:</label>
                            <select name="dataTable_length" aria-controls="dataTable"
                                onChange={e => setMethodStatistic(e.target.value)}
                                value={methodStatistic}
                                className="custom-select custom-select-sm form-control form-control-sm"
                                style={{ width: 150 }}>
                                <option value="nam">Năm</option>
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
                    {isDisplay && <ChartProfit data={data} options={options} />}
                    
                </div>
            </div>
        </div>
    );
}
