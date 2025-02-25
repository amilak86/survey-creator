let json = {
  completedHtml:
    "<h3>Thank you for your feedback.</h3> <h5>Your thoughts and ideas will help us to create a great product!</h5>",
  completedHtmlOnCondition: [
    {
      expression: "{nps_score} > 8",
      html:
        "<h3>Thank you for your feedback.</h3> <h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
    },
    {
      expression: "{nps_score} < 7",
      html:
        "<h3>Thank you for your feedback.</h3> <h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br/>"
    }
  ],
  pages: [
    {
      name: "page1",
      title: "page1 -- title",
      description: "page1 -- description",
      elements: [
        {
          type: "rating",
          name: "nps_score",
          title:
            "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
          isRequired: true,
          rateMin: 0,
          rateMax: 10,
          minRateDescription: "(Most unlikely)",
          maxRateDescription: "(Most likely)"
        },
        {
          type: "checkbox",
          name: "promoter_features",
          visibleIf: "{nps_score} >= 9",
          title: "What features do you value the most?",
          isRequired: true,
          validators: [
            {
              type: "answercount",
              text: "Please select two features maximum.",
              maxCount: 2
            }
          ],
          hasOther: true,
          choices: [
            "Performance",
            "Stability",
            "User Interface",
            "Complete Functionality"
          ],
          otherText: "Other feature:",
          colCount: 2
        },
        {
          type: "comment",
          name: "passive_experience",
          visibleIf: "{nps_score} > 6  and {nps_score} < 9",
          title: "What is the primary reason for your score?"
        },
        {
          type: "comment",
          name: "disappointed_experience",
          visibleIf: "{nps_score} notempty",
          title:
            "What do you miss and what was disappointing in your experience with us?"
        }
      ]
    },
    {
      name: "page2",
      elements: [
        {
          type: "checkbox",
          name: "question4",
          choices: ["item1", "item2", "item3"]
        }
      ]
    },
    {
      name: "page3",
      elements: [
        {
          type: "dropdown",
          name: "question5",
          choices: ["item1", "item2", "item3"]
        }
      ]
    },
    {
      name: "page4",
      elements: [
        {
          type: "rating",
          name: "question6"
        }
      ]
    }
  ]
};

const options = {
  showLogicTab: true,
  showTranslationTab: true,
  showEmbeddedSurveyTab: true,
  isAutoSave: true
};

class CustomToolboxWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }
  toggle() {
    this.setState({ collapsed: !this.state.collapsed });
  }
  render() {
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            left: "100%",
            top: 0,
            padding: "16px",
            cursor: "pointer"
          }}
          title={this.state.collapsed ? "Show toolbox" : "Hide toolbox"}
          onClick={() => this.toggle()}
        >
          {this.state.collapsed ? ">>" : "<<"}
        </div>
        {this.state.collapsed ? null : (
          <SurveyCreator.SurveyCreatorToolbox
            creator={this.props.creator}
          ></SurveyCreator.SurveyCreatorToolbox>
        )}
      </div>
    );
  }
}

SurveyReact.ReactElementFactory.Instance.registerElement(
  "svc-toolbox",
  (props) => {
    return React.createElement(CustomToolboxWrapper, props);
  }
);

const creator = new SurveyCreator.SurveyCreator(options);
creator.JSON = json;
window.creator = creator;

creator.onElementAllowOperations.add((sender, options) => {
  if (options.obj.isPage) {
    options.allowDelete = sender.survey.pageCount > 1;
  }
});

creator.saveSurveyFunc = (no, callback) => {
  setTimeout(function () {
    callback(no, true);
  }, 1000);
};

ReactDOM.render(
  <React.StrictMode>
    <SurveyCreator.SurveyCreatorComponent creator={creator} />
  </React.StrictMode>,
  document.getElementById("root")
);
creator.toolbarItems.push(
  new Survey.Action({
    id: "toolboxCustomization",
    visible: true,
    title: "Toolbox Customization",
    enabled: true,
    action: function () {
      alert("Hi!");
    }
  })
);
// creator.toolbox.changeCategories([
//     {
//         name: "panel",
//         category: "Panels"
//     }, {
//         name: "paneldynamic",
//         category: "Panels"
//     }, {
//         name: "matrix",
//         category: "Matrix"
//     }, {
//         name: "matrixdropdown",
//         category: "Matrix"
//     }, {
//         name: "matrixdynamic",
//         category: "Matrix"
//     }
// ]);
// creator.toolbox.isCompact = true;
