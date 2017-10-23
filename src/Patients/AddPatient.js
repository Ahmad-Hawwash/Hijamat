import React, {Component, PropTypes} from 'react';
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { WithContext as ReactTags } from 'react-tag-input';
// import CalendarHeatmap from 'react-calendar-heatmap';
// import Demo from './graph_heat_map';
import { patientCreate } from "../actions";

class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
    //   suggestions: ["mango", "pineapple", "orange", "pear"]
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  handleDelete(i) {
    let tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags: tags });
  }

  handleAddition(tag) {
    let tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({ tags: tags });
  }

  handleDrag(tag, currPos, newPos) {
    let tags = this.state.tags;

    // mutate array 
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render 
    this.setState({ tags: tags });
  }
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div dir="rtl" className={className}>
        <label>{field.label}</label>
        <input dir="rtl" className="form-control" type={field.type} {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
    
    // this.props.patientCreate(values, () => {
    // //   this.props.history.push("/");
    // });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      // <Demo />
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} style={styles.formStyles}>
        <Field
          label="اسم المريض"
          name="name"
          type="text"
          component={this.renderField}
        />

        <Field
          label="سنة الميلاد"
          name="birth"
          type="number"
          component={this.renderField}
        />

        <div dir="rtl" className="form-control form-group" style={styles.tagsStyle}>
          <label>حالاته الصحية</label>
          <ReactTags className="form-control form-group"
            tags={this.state.tags}
            allowDeleteFromEmptyInput={false}
            /* suggestions={} */
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag} />
        </div>

        <div dir="rtl">
          <button type="submit" className="btn btn-primary" style={{margin: 10}}>اضافة</button>
          <Link to="/" className="btn btn-danger">الغاء</Link>
        </div>
      </form>
    );
  }
}

const styles = {
  tagsStyle: {
    "wordWrap": "break-word"
  },
  formStyles:{
    marginLeft: 150,
    marginRight: 150,
    marginTop: 50
  }
};

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }
  return errors;
}

// export default AddPatient;
export default reduxForm({
  validate,
  form: "PostsNewForm"
})(connect(null, { patientCreate })(AddPatient));
