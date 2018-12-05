var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * A simple React component
 */
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            project: '',
            activity: '',
            from: '',
            to: '',
            note: '',
            billable: '',
            time: '',
            edditing: false,
            data: []
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.deleteRecord = _this.deleteRecord.bind(_this);
        _this.edditRecord = _this.edditRecord.bind(_this);
        _this.confirmDeletion = _this.confirmDeletion.bind(_this);
        _this.confirmEdditing = _this.confirmEdditing.bind(_this);
        _this.clearFormData = _this.clearFormData.bind(_this);
        _this.totalTime = _this.totalTime.bind(_this);
        return _this;
    }
    Application.prototype.handleChange = function (event) {
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        var _a;
    };
    Application.prototype.confirmDeletion = function (callback, index) {
        swal({
            title: 'Are you sure?',
            text: 'Would you like to delete this document?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, delete it!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (deletionConfirmed) {
            if (deletionConfirmed) {
                callback(index);
                swal('Deleted!', 'Your document has been deleted.', 'success');
            }
            else {
                swal('Cancelled!', 'Your document  was not deleted.', 'error');
            }
        });
    };
    ;
    Application.prototype.confirmEdditing = function (callback, index, clearData) {
        var _this = this;
        swal({
            title: 'Are you sure?',
            text: 'Would you like to eddit this document?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes!',
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (edditingConfirmed) {
            if (edditingConfirmed) {
                callback(index);
                _this.setState({ edditing: false });
                clearData();
                swal('Editted!', 'Your document has been Editted.', 'success');
            }
            else {
                _this.setState({ edditing: false });
                swal('Cancelled!', 'Your document  was not Editted.', 'error');
            }
        });
    };
    ;
    Application.prototype.clearFormData = function () {
        this.setState({
            project: '',
            activity: '',
            from: '',
            to: '',
            note: '',
            billable: '',
            time: ''
        });
    };
    Application.prototype.deleteRecord = function (index) {
        var temp = this.state.data;
        this.setState({ data: temp.filter(function (newInfo, i) {
                return (i !== index);
            }) });
    };
    Application.prototype.edditRecord = function (index) {
        var _this = this;
        var temp = this.state.data;
        this.setState({
            data: temp.map(function (oldInfo, pos) {
                if (pos === index) {
                    return _this.state;
                }
                return oldInfo;
            })
        });
    };
    Application.prototype.handleSubmit = function (event) {
        event.preventDefault();
        var time = Math.abs((parseInt(this.state.to) - parseInt(this.state.from)));
        this.state.time = time;
        if (this.state.edditing) {
            this.confirmEdditing(this.edditRecord, this.state.index, this.clearFormData);
            return null;
        }
        this.state.data.push(this.state);
        this.setState({ data: this.state.data });
        this.clearFormData();
    };
    Application.prototype.totalTime = function () {
        var sum = 0;
        this.state.data.forEach(function (info) {
            sum += info.time;
        });
        return sum;
    };
    Application.prototype.render = function () {
        var _this = this;
        return React.createElement("div", null,
            React.createElement("h1", { style: {
                    fontSize: "80px",
                    padding: "40px 0 40px 0"
                } }, "Time Sheet"),
            // React.createElement("p", null, "Test out by entering data.  You can after delete or edit."),
            React.createElement("br", null),
            !this.state.edditing ?
                React.createElement("form", { className: "report", onSubmit: this.handleSubmit },
                    React.createElement("div", { className: "col-left" },
                        React.createElement("label", null,
                            "Project",
                            React.createElement("select", { name: "project", value: this.state.project, onChange: this.handleChange, id: "project" },
                                React.createElement("option", { value: "" }, "Please select project..."),
                                React.createElement("option", { value: "project1" }, "MBD Onsite"),
                                React.createElement("option", { value: "project2" }, "SA Taxi"),
                                React.createElement("option", { value: "project3" }, "Principa"))),
                        React.createElement("label", null,
                            "Activity",
                            React.createElement("select", { name: "activity", value: this.state.activity, onChange: this.handleChange, id: "activity" },
                                React.createElement("option", { value: "" }, "Please select activity..."),
                                React.createElement("option", { value: "activity1" }, "Coding and Implementation"),
                                React.createElement("option", { value: "activity2" }, "Testing"),
                                React.createElement("option", { value: "activity3" }, "Team Discussion"))),
                        React.createElement("div", { className: "pair" },
                            React.createElement("label", { className: "pair-left" },
                                "From",
                                React.createElement("input", { type: "time", value: this.state.from, onChange: this.handleChange, name: "from", id: "from" })),
                            React.createElement("label", { className: "pair-right" },
                                "To",
                                React.createElement("input", { type: "time", value: this.state.to, onChange: this.handleChange, name: "to", id: "to" }))),
                        React.createElement("label", { className: "checkbox" },
                            React.createElement("span", null, "Billable"),
                            React.createElement("input", { type: "checkbox", value: this.state.checkbox, onChange: this.handleChange, name: "billable", id: "billable" }))),
                    React.createElement("div", { className: "col-right" },
                        React.createElement("label", null,
                            "Note",
                            React.createElement("textarea", { name: "note", value: this.state.note, onChange: this.handleChange, id: "note", cols: "30", rows: "10" })),
                        React.createElement("button", { type: "submit" }, "Save"))) :
                React.createElement("form", { className: "report", onSubmit: this.handleSubmit },
                    React.createElement("div", { className: "col-left" },
                        React.createElement("label", null,
                            "Project",
                            React.createElement("select", { name: "project", value: this.state.project, onChange: this.handleChange, id: "project" },
                                React.createElement("option", { value: "" }, "Please select project..."),
                                React.createElement("option", { value: "project1" }, "Project 1"),
                                React.createElement("option", { value: "project2" }, "Project 2"),
                                React.createElement("option", { value: "project3" }, "Project 3"))),
                        React.createElement("label", null,
                            "Activity",
                            React.createElement("select", { name: "activity", value: this.state.activity, onChange: this.handleChange, id: "activity" },
                                React.createElement("option", { value: "" }, "Please select activity..."),
                                React.createElement("option", { value: "activity1" }, "Activity 1"),
                                React.createElement("option", { value: "activity2" }, "Activity 2"),
                                React.createElement("option", { value: "activity3" }, "Activity 3"))),
                        React.createElement("div", { className: "pair" },
                            React.createElement("label", { className: "pair-left" },
                                "From",
                                React.createElement("input", { type: "time", value: this.state.from, onChange: this.handleChange, name: "from", id: "from" })),
                            React.createElement("label", { className: "pair-right" },
                                "To",
                                React.createElement("input", { type: "time", value: this.state.to, onChange: this.handleChange, name: "to", id: "to" }))),
                        React.createElement("label", { className: "checkbox" },
                            React.createElement("span", null, "Billable"),
                            React.createElement("input", { type: "checkbox", value: this.state.checkbox, onChange: this.handleChange, name: "billable", id: "billable" }))),
                    React.createElement("div", { className: "col-right" },
                        React.createElement("label", null,
                            "Note",
                            React.createElement("textarea", { name: "note", value: this.state.note, onChange: this.handleChange, id: "note", cols: "30", rows: "10" })),
                        React.createElement("button", { type: "submit" }, "Save"))),
            this.state.data[0] ?
                React.createElement("table", null,
                    React.createElement("caption", null, "December 2018"),
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, "Project"),
                            React.createElement("th", null, "Activity"),
                            React.createElement("th", null, "From"),
                            React.createElement("th", null, "To"),
                            React.createElement("th", null, "Note"),
                            React.createElement("th", null, "Action"),
                            React.createElement("th", null, "Delete"))),
                    React.createElement("tfoot", null,
                        React.createElement("tr", null,
                            React.createElement("td", { colspan: "7" },
                                "Sum total time: ",
                                this.totalTime()))),
                    React.createElement("tbody", null, this.state.data.map(function (info, index) {
                        return React.createElement("tr", { key: index },
                            React.createElement("td", null, info.project),
                            React.createElement("td", null, info.activity),
                            React.createElement("td", null, info.from),
                            React.createElement("td", null, info.to),
                            React.createElement("td", null, info.note),
                            React.createElement("td", null,
                                React.createElement("button", { onClick: function () {
                                        _this.setState({ edditing: true,
                                            index: index });
                                        _this.clearFormData();
                                        swal('please go back to form and edit');
                                    } }, "Edit")),
                            React.createElement("td", { style: { color: 'black' } },
                                React.createElement("button", { onClick: function () { _this.confirmDeletion(_this.deleteRecord, index); } }, "Delete")));
                    }))) : "");
    };
    return Application;
}(React.Component));
/*
 * Render the above component into the div#app
 */
React.render(React.createElement(Application, null), document.getElementById('app'));