import { Component, createElement } from "react";
//import { HelloWorldSample } from "./components/HelloWorldSample";
import { DatePicker, Space } from "antd";

import "./ui/AntDateRangePickerJS.css";
import "../node_modules/antd/dist/antd";
import "../node_modules/antd/dist/antd.css";
const { RangePicker } = DatePicker;
export class preview extends Component {
    constructor(props) {
        super(props);

        const { RPWidgetsize } = this.props;
        this.RPWidgetsize = RPWidgetsize;
        const { PickerData } = this.props; //获得Pick type数据

        const { ShowBorder } = this.props;
        this.ShowBorder = ShowBorder;
        this.pickerAttribute = PickerData;
    }
    render() {
        return (
            <Space direction="vertical" size={12}>
                <RangePicker picker={this.pickerAttribute} bordered={this.ShowBorder} size={this.RPWidgetsize} />
            </Space>
        );
    }
}

export function getPreviewCss() {
    return require("./ui/AntDateRangePickerJS.css");
}
