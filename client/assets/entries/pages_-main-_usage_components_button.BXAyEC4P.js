import{d as P,E as C,I as D,P as F,J as L,y as U,Z as z,C as c,m as v,M as d,p as g,Q as A,s as m,Y as E,_ as I,r as u,c as O,o as M,b as o,a as e,l as T,u as N,v as j,e as n,A as l,t as R,i as V,f as G,g as $,h as Y}from"../chunks/chunk-Cap8pgze.js";import{C as q}from"../chunks/chunk-BKghwdQY.js";import{C as J}from"../chunks/chunk-CFKw9rTS.js";import{F as Z}from"../chunks/chunk-BPc-n2v8.js";import{C as W}from"../chunks/chunk-B4FWqrpK.js";import{i as X}from"../chunks/chunk-BDRJS3w7.js";import"../chunks/chunk-CUKu3W66.js";/* empty css                      */import"../chunks/chunk-jcXJ05Qh.js";import"../chunks/chunk-LOTtwplp.js";import"../chunks/chunk-BXl3LOEh.js";import"../chunks/chunk-BQnmGBDA.js";import"../chunks/chunk-CCqf0Ys0.js";/* empty css                      *//* empty css                      *//* empty css                      */const H=P({name:"DocumentationPageUsageComponentsButton",components:{CodePreview:q,ComponentForm:J,ComponentInfo:W,FieldYocoIcon:Z,KtButton:c,KtButtonGroup:z,KtFieldSingleSelect:U,KtFieldText:L,KtFieldToggleGroup:F,KtForm:D,KtFormControllerObject:C},setup(){const a=v(d.Button.ToggleStatus.OFF),t=v(d.Button.ToggleStatus.OFF),y=v({booleanFlags:{isDisabled:!1,isLoading:!1},props:{dataTest:null,icon:null,iconPosition:d.SplitButton.IconPosition.LEFT,label:"Split Button",size:d.SplitButton.Size.MEDIUM,type:d.SplitButton.Type.DEFAULT}});return{iconOptions:Object.values(E.Icon).map(s=>({label:s,value:s})),ktButtonComponent:c,ktSplitButtonComponent:A,onToggleDefaultClick:s=>{a.value=s},onToggleTextClick:s=>{t.value=s},propFormatters:{actions:s=>JSON.stringify(s,null,"	").split(`
`)},showToaster:s=>{m({text:s})},splitButtonProps:g(()=>({...y.value.booleanFlags,...y.value.props,actions:[{dataTest:"action-1",icon:"calendar",label:"Action 1",onClick:()=>m({text:"Action 1"})},{dataTest:"action-2",icon:"landline",label:"Action 2",onClick:()=>m({text:"Action 2"})},{dataTest:"action-3",icon:"location",isDisabled:!0,label:"Action 3",onClick:()=>m({text:"Action 3"})},{dataTest:"action-4",label:"Action 4 (without icon)",onClick:()=>m({text:"Action 4"})}]})),splitButtonSettings:y,toggleDefaultIcon:g(()=>a.value===d.Button.ToggleStatus.ON?"check":"close"),toggleDefaultLabel:g(()=>a.value===d.Button.ToggleStatus.ON?"DEFAULT ON":"DEFAULT OFF"),toggleDefaultStatus:a,toggleTextIcon:g(()=>t.value===d.Button.ToggleStatus.ON?"check":"close"),toggleTextLabel:g(()=>t.value===d.Button.ToggleStatus.ON?"TEXT ON":"TEXT OFF"),toggleTextStatus:t}}}),Q="/assets/static/button_label.CSfM6tAZ.png",_={style:{display:"flex","flex-wrap":"wrap",gap:"var(--unit-6)"}},tt={style:{display:"flex",gap:"var(--unit-6)"}},et={style:{display:"flex",gap:"var(--unit-6)"}},ot={style:{display:"flex","flex-direction":"column",gap:"var(--unit-1)",width:"200px"}},nt={style:{display:"flex","flex-direction":"column",gap:"var(--unit-1)"}},lt={style:{display:"flex",gap:"var(--unit-6)"}},it={style:{display:"flex",gap:"var(--unit-6)"}},at={class:"field-row"};function st(a,t,y,s,dt,pt){const b=u("ComponentInfo"),i=u("KtButton"),p=u("CodePreview"),S=u("KtButtonGroup"),f=u("KtFieldSingleSelect"),h=u("KtFormControllerObject"),K=u("KtFieldToggleGroup"),B=u("KtFieldText"),w=u("FieldYocoIcon"),x=u("ComponentForm"),k=u("KtForm");return M(),O("div",null,[o(b,N(j({component:a.ktButtonComponent})),null,16),t[33]||(t[33]=e("p",null," Use buttons to lead a call to action or guide a user to their next steps. ",-1)),t[34]||(t[34]=e("h2",null,"Labels",-1)),t[35]||(t[35]=e("p",null," The label text explains the purpose of the button, which should be clear, self-explanatory and short. ",-1)),t[36]||(t[36]=e("img",{alt:"Button labels",src:Q},null,-1)),t[37]||(t[37]=e("p",null,[e("code",null,"Yes/No"),n(" buttons are not self-explanatory, the user needs to read the context to understand the action. Using "),e("code",null,"Cancel/Replace"),n(" buttons let the user respond quickly without thinking. ")],-1)),t[38]||(t[38]=e("h2",null,"Types",-1)),o(p,{code:`
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton type="primary" @click="...">
						Primary Button
					</KtButton>
					<KtButton type="secondary" @click="...">
						Secondary Button
					</KtButton>
					<KtButton type="danger" @click="...">
						Danger Button
					</KtButton>
					<KtButton @click="...">
						Default Button
					</KtButton>
					<KtButton type="text" @click="...">
						Text Button
					</KtButton>
				</div>
			`,language:"vue-html"},{default:l(()=>[e("div",_,[o(i,{type:"primary",onClick:t[0]||(t[0]=r=>a.showToaster("primary"))},{default:l(()=>[...t[8]||(t[8]=[n(" Primary Button ",-1)])]),_:1}),o(i,{type:"secondary",onClick:t[1]||(t[1]=r=>a.showToaster("secondary"))},{default:l(()=>[...t[9]||(t[9]=[n(" Secondary Button ",-1)])]),_:1}),o(i,{type:"danger",onClick:t[2]||(t[2]=r=>a.showToaster("danger"))},{default:l(()=>[...t[10]||(t[10]=[n(" Danger Button ",-1)])]),_:1}),o(i,{onClick:t[3]||(t[3]=r=>a.showToaster("default"))},{default:l(()=>[...t[11]||(t[11]=[n(" Default Button ",-1)])]),_:1}),o(i,{type:"text",onClick:t[4]||(t[4]=r=>a.showToaster("text"))},{default:l(()=>[...t[12]||(t[12]=[n(" Text Button ",-1)])]),_:1})])]),_:1}),t[39]||(t[39]=T("<h4>Primary button</h4><p> Use the primary button to lead a main call to action, such as changing the status of an order, or submitting a form. We suggest only using one primary button on each page (not including the primary button on a different layer). If there is another strong action needed, compare their priority and choose the most important one. </p><h4>Secondary Button</h4><p> Use a secondary button only when there is a main call to action in the page. </p><h4>Danger Button</h4><p> The danger button should be used only for actions which can&#39;t be undone. For example, canceling an order or deleting a material. Like the primary button, it should also limited to once per page. </p><h4>Default button</h4><p>This button can be used in most cases.</p><h4>Text button</h4><p> A text button can be used for sub-menus and page navigation. It also can pair with a primary button for destructive actions such as <code>Cancel</code>. </p><h2>Label</h2>",11)),o(p,{code:`
				<KtButton icon="edit" label="Edit Button" type="primary" />
				<!-- is equivalent to -->
				<KtButton icon="edit" type="primary">Edit Button</KtButton>
			`,language:"vue-html"},{default:l(()=>[o(i,{icon:"edit",label:"Edit Button",type:"primary"})]),_:1}),t[40]||(t[40]=T("<p> Instead of using the default slot, you can also provide text via the <code>label</code> property. Note that <code>v-text</code> and <code>v-t</code> are <strong>NOT SUPPORTED</strong>. </p><h2>Icon</h2><ul><li><strong>Label only:</strong> Used in most cases.</li><li><strong>Icon and label:</strong> Use when you need to catch the user&#39;s attention. </li><li><strong>Icon only:</strong> Use when you have limited space, such as when the page needs to fit on a mobile device, and a single icon is enough to convey the meaning, </li><li><strong>iconPosition</strong> prop can be used to place icon to the right of the label. Is left by default. </li><li><strong>helpText</strong> prop can be passed to <strong>Icon only</strong> buttons that is displayed on button hover. </li></ul>",3)),o(p,{code:`
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton type="primary">Edit button</KtButton>
					<KtButton icon="edit" label="Edit Button" type="primary" />
					<KtButton icon="edit" iconPosition="right" label="Icon To The Right" type="primary"/>
					<KtButton helpText="This is an icon button" icon="edit" type="primary" />
				</div>
			`,language:"vue-html"},{default:l(()=>[e("div",tt,[o(i,{type:"primary"},{default:l(()=>[...t[13]||(t[13]=[n("Edit button",-1)])]),_:1}),o(i,{icon:"edit",label:"Edit Button",type:"primary"}),o(i,{icon:"edit",iconPosition:"right",label:"Icon To The Right",type:"primary"}),o(i,{helpText:"This is an icon button",icon:"edit",type:"primary"})])]),_:1}),t[41]||(t[41]=e("h2",null,[e("code",null,"toggleStatus")],-1)),t[42]||(t[42]=e("ul",null,[e("li",null,[n(" For buttons that are "),e("strong",null,"toggleable"),n(', and can have two different status: "ON" or "OFF" ')]),e("li",null,[n(" This prop is only valid for buttons of type "),e("strong",null,'"default"'),n(" or type "),e("strong",null,'"text"'),n(". ")])],-1)),o(p,{code:`
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton
						:icon="toggleDefaultIcon"
						:toggleStatus="toggleDefaultStatus"
						type="default"
						@update:toggleStatus="(event) => onToggleDefaultClick(event)"
					>
						{{ toggleDefaultLabel }}
					</KtButton
					<KtButton
						:icon="toggleTextIcon"
						:label="toggleTextLabel"
						:toggleStatus="toggleTextStatus"
						type="text"
						@update:toggleStatus="(event) => onToggleTextClick(event)"
					/>
				</div>
			`,language:"vue-html"},{default:l(()=>[e("div",et,[o(i,{icon:a.toggleDefaultIcon,toggleStatus:a.toggleDefaultStatus,type:"default","onUpdate:toggleStatus":t[5]||(t[5]=r=>a.onToggleDefaultClick(r))},{default:l(()=>[n(R(a.toggleDefaultLabel),1)]),_:1},8,["icon","toggleStatus"]),o(i,{icon:a.toggleTextIcon,label:a.toggleTextLabel,toggleStatus:a.toggleTextStatus,type:"text","onUpdate:toggleStatus":t[6]||(t[6]=r=>a.onToggleTextClick(r))},null,8,["icon","label","toggleStatus"])])]),_:1}),t[43]||(t[43]=e("h2",null,[e("code",null,"isMultiline"),n("/"),e("code",null,"isBlock")],-1)),t[44]||(t[44]=e("p",null,[n(" For handling long text, we can use the "),e("code",null,"isMultiline"),n(" and "),e("code",null,"isBlock"),n(" properties. ")],-1)),o(p,{code:`
			<div style="width: 200px; display: flex; flex-direction: column; gap: var(--unit-1)">
				<KtButton block type="primary">Purchase</KtButton>
				<KtButton icon="save" isBlock isMultiline>
					Purchase this product without the 5 year garantee
				</KtButton>
				<KtButton isBlock isMultiline>
					Purchase this product without the 5 year garantee and proceed with the
					2 year only garantee
				</KtButton>
			</div>
			<br/>
			<div style="display: flex; flex-direction: column; gap: var(--unit-1)">
				<KtButton isMultiline>
					Multiline works on one line if the parent does not constraint the width
				</KtButton>
				<KtButton isMultiline>
					(But the height is less reliable as it uses
					<code>line-height</code>)
				</KtButton>
			</div>
			`,language:"vue-html"},{default:l(()=>[e("div",ot,[o(i,{block:"",type:"primary"},{default:l(()=>[...t[14]||(t[14]=[n("Purchase",-1)])]),_:1}),t[17]||(t[17]=e("br",null,null,-1)),o(i,{icon:"save",isBlock:"",isMultiline:""},{default:l(()=>[...t[15]||(t[15]=[n(" Purchase this product without the 5 year garantee ",-1)])]),_:1}),o(i,{isBlock:"",isMultiline:""},{default:l(()=>[...t[16]||(t[16]=[n(" Purchase this product without the 5 year garantee and proceed with the 2 year only garantee ",-1)])]),_:1})]),t[20]||(t[20]=e("br",null,null,-1)),e("div",nt,[o(i,{isMultiline:""},{default:l(()=>[...t[18]||(t[18]=[n(" Multiline works on one line if the parent does not constraint the width ",-1)])]),_:1}),o(i,{isMultiline:""},{default:l(()=>[...t[19]||(t[19]=[n(" (But the height is less reliable as it uses ",-1),e("code",null,"line-height",-1),n(") ",-1)])]),_:1})])]),_:1}),t[45]||(t[45]=e("h2",null,"Loading",-1)),o(p,{code:`
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton icon="edit" isLoading>
						Loading button
					</KtButton>
					<KtButton icon="edit" iconPosition="right" isLoading type="primary">
						Loading button
					</KtButton>
					<KtButton isLoading type="secondary">Loading</KtButton>
					<KtButton isLoading type="danger">Loading</KtButton>
				</div>
			`,language:"vue-html"},{default:l(()=>[e("div",lt,[o(i,{icon:"edit",isLoading:""},{default:l(()=>[...t[21]||(t[21]=[n(" Loading button ",-1)])]),_:1}),o(i,{icon:"edit",iconPosition:"right",isLoading:"",type:"primary"},{default:l(()=>[...t[22]||(t[22]=[n(" Loading button ",-1)])]),_:1}),o(i,{isLoading:"",type:"secondary"},{default:l(()=>[...t[23]||(t[23]=[n("Loading",-1)])]),_:1}),o(i,{isLoading:"",type:"danger"},{default:l(()=>[...t[24]||(t[24]=[n("Loading",-1)])]),_:1})])]),_:1}),t[46]||(t[46]=e("h2",null,"Button Group",-1)),o(p,{code:`
				<KtButtonGroup>
					<KtButton icon="edit" type="primary">Edit</KtButton>
					<KtButton icon="trash" type="secondary">Delete</KtButton>
				</KtButtonGroup>
			`,language:"vue-html"},{default:l(()=>[o(S,null,{default:l(()=>[o(i,{icon:"edit",type:"primary"},{default:l(()=>[...t[25]||(t[25]=[n("Edit",-1)])]),_:1}),o(i,{icon:"trash",type:"secondary"},{default:l(()=>[...t[26]||(t[26]=[n("Delete",-1)])]),_:1})]),_:1})]),_:1}),t[47]||(t[47]=e("h2",null,"Size",-1)),t[48]||(t[48]=e("p",null,[e("code",null,"KtButton"),n(" has 3 sizes: "),e("code",null,"small"),n(", "),e("code",null,"medium"),n(", and "),e("code",null,"large")],-1)),o(p,{code:`
				<div style="display: flex; gap: var(--unit-6)">
					<KtButton icon="edit" size="small" type="primary">
						Small
					</KtButton>
					<KtButton isLoading size="medium">
						Medium (Default)
					</KtButton>
					<KtButton icon="edit" size="large">
						Large
					</KtButton>
				</div>
			`,language:"vue-html"},{default:l(()=>[e("div",it,[o(i,{icon:"edit",size:"small",type:"primary"},{default:l(()=>[...t[27]||(t[27]=[n(" Small ",-1)])]),_:1}),o(i,{isLoading:"",size:"medium"},{default:l(()=>[...t[28]||(t[28]=[n(" Medium (Default) ",-1)])]),_:1}),o(i,{icon:"edit",size:"large"},{default:l(()=>[...t[29]||(t[29]=[n(" Large ",-1)])]),_:1})])]),_:1}),t[49]||(t[49]=e("h2",null,[e("code",null,"isSubmit")],-1)),t[50]||(t[50]=e("p",null,[n(" If you want the button to trigger the native "),e("code",null,"form"),e("code",null,"submit"),n(" event, you need to opt-in via "),e("code",null,"<KtButton isSubmit />")],-1)),t[51]||(t[51]=e("br",null,null,-1)),o(b,{component:a.ktSplitButtonComponent},null,8,["component"]),t[52]||(t[52]=e("p",null," A split button lets someone take one of several related actions. The dominant action is the left button, while additional actions are tucked away in a popover menu that is triggered by clicking on the dropdown button. ",-1)),t[53]||(t[53]=e("h3",null,"Usage",-1)),t[54]||(t[54]=e("h4",null,"Best practices",-1)),t[55]||(t[55]=e("ul",null,[e("li",null," When there isn't a clear default action, present all options equally by using a dropdown menu or button group. "),e("li",null," Try to keep the number of secondary actions to a minimum to aid focus and comprehension. "),e("li",null," Remember that some users may miss the secondary action entirely, so ensure users aren't required to interact with the secondary action to proceed. In other words, make sure the main action button allows people to proceed in most cases. "),e("li",null,"Do not repeat the default action in the secondary actions menu."),e("li",null," Avoid grouping actions that are dissimilar in the secondary actions menu. "),e("li",null,' To represent a ”more actions” button, use a simple dropdown menu button with the "...” icon. ')],-1)),o(k,{modelValue:a.splitButtonSettings,"onUpdate:modelValue":t[7]||(t[7]=r=>a.splitButtonSettings=r),size:"small"},{default:l(()=>[o(x,{component:a.ktSplitButtonComponent,propFormatters:a.propFormatters,props:a.splitButtonProps},{"component-form-settings":l(()=>[e("div",null,[o(h,{formKey:"props"},{default:l(()=>[t[30]||(t[30]=e("h4",null,"Settings",-1)),o(f,{formKey:"type",hideClear:"",isUnsorted:"",label:"type",options:[{label:"default (default)",value:"default"},{label:"primary",value:"primary"}]}),o(f,{formKey:"size",hideClear:"",isUnsorted:"",label:"size",options:[{label:"small",value:"small"},{label:"medium (default)",value:"medium"},{label:"large",value:"large"}]})]),_:1}),o(K,{formKey:"booleanFlags",isOptional:"",label:"Boolean Flags",options:[{key:"isDisabled",label:"isDisabled"},{key:"isLoading",label:"isLoading"}],style:{"margin-top":"0.8rem"},type:"switch"})]),e("div",null,[o(h,{formKey:"props"},{default:l(()=>[t[31]||(t[31]=e("h4",null,"Texts",-1)),o(B,{formKey:"label",label:"label"}),o(B,{formKey:"dataTest",isOptional:"",label:"dataTest"}),t[32]||(t[32]=e("h4",null,"Decoration",-1)),e("div",at,[o(w,{isOptional:""}),o(f,{formKey:"iconPosition",isOptional:"",isUnsorted:"",label:"iconPosition",options:[{label:"left (default)",value:"left"},{label:"right",value:"right"}]})])]),_:1})])]),_:1},8,["component","propFormatters","props"])]),_:1},8,["modelValue"])])}const ut=I(H,[["render",st]]),rt=Object.freeze(Object.defineProperty({__proto__:null,default:ut},Symbol.toStringTag,{value:"Module"})),Ct={hasServerOnlyHook:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!1}},isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/__internal/integration/onRenderClient",fileExportPathToShowToUser:[]},valueSerialized:{type:"pointer-import",value:Y}},onPageTransitionStart:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionStart.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:$}},onPageTransitionEnd:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+onPageTransitionEnd.ts",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:G}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/(main)/usage/components/button/+Page.vue",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:rt}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"vike-vue/config",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},Layout:{type:"cumulative",definedAtData:[{filePathToShowToUser:"/layouts/LayoutActionbar.vue",fileExportPathToShowToUser:[]},{filePathToShowToUser:"/chrome/TheGlobalLayout.vue",fileExportPathToShowToUser:[]}],valueSerialized:[{type:"pointer-import",value:X},{type:"pointer-import",value:V}]},title:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/+config.ts",fileExportPathToShowToUser:["default","title"]},valueSerialized:{type:"js-serialized",value:"Kotti Design System"}}};export{Ct as configValuesSerialized};
