import { Component, createElement } from "react";
import { DatePicker, Space } from "antd";
//import { HelloWorldSample } from "./components/HelloWorldSample";
import moment from "moment";
import "./ui/AntDateRangePickerJS.css";
import "../node_modules/antd/dist/antd";
import "../node_modules/antd/dist/antd.css";
import "../node_modules/@ant-design/icons";

//变量定义
const { RangePicker } = DatePicker;
//设置List 时间格式
const dateFormatList = ["YYYY/MM/DD", "YYYY/MM", "YYYY", "YYYY-Q Q", "YYYY-wo"];
// var dateFormat='YYYY/MM/DD';

export default class AntDateRangePickerJS extends Component {
    //构造方法

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onOpenChange = this.onOpenChange.bind(this);
        // this.onOk = this.onOk.bind(this);
        const { DateFormat } = this.props; //获得 date 时间格式 string
        const { RPWidgetsize } = this.props; //获得widget size值 enum
        const { PickerData } = this.props; //获得Pick type数据 enum
        const { ShowTimeValue } = this.props; //时分秒展示变量
        const { ShowBorder } = this.props; //获得是否展示边框 boolean
        const { DisableStartDate } = this.props; //是否禁用Startdate   boolean
        const { DisableEndDate } = this.props; //是否禁用Enddate   boolean
        const { defaultEnddate } = this.props; // 设置默认值defaultEnddate   String
        const { defaultStartdate } = this.props; // 设置默认值  defaultStartdate   String

        this.DisableStartDate = DisableStartDate;
        this.DisableEndDate = DisableEndDate;
        this.defaultStartdate = defaultStartdate;
        this.defaultEnddate = defaultEnddate;

        this.RPWidgetsize = RPWidgetsize;
        this.ShowBorder = ShowBorder; //boolean
        this.pickerAttribute = PickerData;
        this.ShowTimeValue = ShowTimeValue;
        if (this.ShowTimeValue) {
            this.ShowTimeValue = "HH:mm:ss";
        }

        this.dateFormat = "YYYY/MM/DD";

        if (DateFormat !== null && DateFormat !== "") {
            this.dateFormat = DateFormat;
        } else {
            // console.log('--------------------------------------');
            switch (this.pickerAttribute) {
                case "week":
                    this.dateFormat = dateFormatList[4];
                    break;
                case "month":
                    this.dateFormat = dateFormatList[1];
                    break;
                case "quarter":
                    this.dateFormat = "";
                    break;
                case "year":
                    this.dateFormat = dateFormatList[2];
                    break;
                default:
                    this.dateFormat = dateFormatList[0];
            }
        }

        // console.log('dateFormat: ', this.dateFormat);
        // console.log('ShowTimeValue: ', this.ShowTimeValue);
        // console.log('picker_Attribute: ', this.picker_Attribute);
    }
    //回调函数
    onChange(value, dateStrings) {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateStrings);
        // console.log('dateFormat: ', this.dateFormat);
        const { StartDate } = this.props;
        const { EndDate } = this.props;
        const { onClickChangeAction } = this.props;

        if (this.pickerAttribute === "week" || this.pickerAttribute === "quarter") {
            StartDate.setValue(dateStrings[0]);
            EndDate.setValue(dateStrings[1]);
        } else {
            StartDate.setValue(new Date(dateStrings[0]));
            EndDate.setValue(new Date(dateStrings[1]));
        }

        //执行动作
        if (onClickChangeAction != null && onClickChangeAction.canExecute) {
            onClickChangeAction.execute();
        }
    }
    // onOk(value) {
    //待开发为time picker准备函数
    // console.log('onOk: ', value);
    //  }
    onOpenChange = open => {
        if (open) {
            console.log("onOpenChange: ", open);
        } else {
            const { onClickLeaveAction } = this.props;
            if (onClickLeaveAction != null && onClickLeaveAction.canExecute) {
                onClickLeaveAction.execute();
            }
        }
    };
    render() {
        return (
            <Space direction="vertical" size={12}>
                <RangePicker
                    showTime={this.ShowTimeValue}
                    picker={this.pickerAttribute}
                    bordered={this.ShowBorder}
                    size={this.RPWidgetsize}
                    format={this.dateFormat}
                    defaultValue={[
                        this.defaultStartdate === "" ? null : moment(this.defaultStartdate, this.dateFormat),
                        this.defaultEnddate === "" ? null : moment(this.defaultEnddate, this.dateFormat)
                    ]}
                    disabled={[this.DisableStartDate, this.DisableEndDate]}
                    onChange={this.onChange}
                    // onOk={this.onOk}
                    onOpenChange={this.onOpenChange}
                />
            </Space>
        );
    }
}
