import React, {Component} from 'react';
import range from 'lodash/range'
import './App.css';

class Pointer extends Component{
    render(){
        const {x,y,r,type,name,index}=this.props,fontSize=Math.min(r/1.2,35);
        return (
            <g transform={`translate(${x} ${y})`}>
                <circle cx={0} cy={0} r={r*2} stroke="none" fill={type} style={{opacity:0}}>
                    <animateTransform attributeName="transform" begin={`${index*200}ms`} dur="0.5s" type="scale" from="0" to="1"/>
                    <animate attributeName="opacity" from="0" to="1" begin={`${index*200}ms`} dur="0.5s" fill="freeze"/>
                </circle>
                {r>=10&&name.length*fontSize<r*4-10?<text x={0} y={0} fill="#fff" style={{
                    fillOpacity:0,
                    textAnchor: 'middle',
                    dominantBaseline:'middle',
                    fontSize:`${fontSize}px`
                }}>{name}<animate attributeName="fill-opacity" from="0" to="1" begin={`${index*200+500}ms`} dur="0.3s" fill="freeze"/></text>:null}
            </g>
        );
    }
}

class App extends Component {
    static defaultProps={
        width:600,
        height:600
    };
    state={
        active:'A'
    };
    handlerClick=(e)=>{
        const {top,left}=this.el.getBoundingClientRect(),x=e.clientX-left,y=e.clientY-top,{width,height,onChange}=this.props;
        let active;
        if(x<width/2&&y<height/2){
            active='C';
        }else if(x<width/2&&y>=height/2){
            active='D';
        }else if(x>=width/2&&y>height/2){
            active='B';
        }else if(x>width/2&&y<=height/2){
            active='A';
        }
        this.setState({active});
        onChange&&onChange(active);
    };
    render() {
        const {width,height,data}=this.props;
        return (
            <div className="App">
                <svg ref={(el)=>this.el=el} width={`${width}px`} height={`${height}px`} viewBox={`0 0 ${width} ${height}`} onClick={this.handlerClick}>
                    <g>
                        {this.state.active==="A"?<rect x={width/2} y={0} width={width/2} height={height/2} fill="#F4FCFF"/>:null}
                        {this.state.active==="B"?<rect x={width/2} y={height/2} width={width/2} height={height/2} fill="#F4FCFF"/>:null}
                        {this.state.active==="C"?<rect x={0} y={0} width={width/2} height={height/2} fill="#F4FCFF"/>:null}
                        {this.state.active==="D"?<rect x={0} y={height/2} width={width/2} height={height/2} fill="#F4FCFF"/>:null}
                        <g>
                            <g transform={`translate(${width-22} ${0})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22} fill={this.state.active==="A"?"#3B99FF":"#eee"}/>
                                <text x={6} y={16}  style={{
                                    fontSize:'14px',
                                    fill: this.state.active==="A"?"#FFF":'#333'
                                }}>A</text>
                            </g>
                            <g transform={`translate(${width-22} ${height-22})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22} fill={this.state.active==="B"?"#3B99FF":"#eee"}/>
                                <text x={6} y={16}  style={{
                                    fontSize:'14px',
                                    fill: this.state.active==="B"?"#FFF":'#333'
                                }}>B</text>
                            </g>
                            <g transform={`translate(${0} ${0})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22} fill={this.state.active==="C"?"#3B99FF":"#eee"}/>
                                <text x={6} y={16}  style={{
                                    fontSize:'14px',
                                    fill: this.state.active==="C"?"#FFF":'#333'
                                }}>C</text>
                            </g>
                            <g transform={`translate(${0} ${height-22})`}>
                                <rect rx="2" x={0} y={0} width={22} height={22} fill={this.state.active==="D"?"#3B99FF":"#eee"}/>
                                <text x={6} y={16}  style={{
                                    fontSize:'14px',
                                    fill: this.state.active==="D"?"#FFF":'#333'
                                }}>D</text>
                            </g>
                        </g>
                        <g transform={`translate(${0} ${height/2})`}>
                            <line x2={width} y2={0} style={{
                                stroke:'#DFDFDF'
                            }}/>
                            {range(0,13).map((value,index)=><line key={index} x1={value*width/12} x2={value*width/12} y1={0} y2={-5} stroke="#DFDFDF" strokeWidth={2}/>)}
                        </g>
                        <g transform={`translate(${width/2} ${0})`}>
                            <line x2={0} y2={height} style={{
                                stroke:'#DFDFDF'
                            }}/>
                            {range(0,13).map((value,index)=><line key={index} y1={value*width/12} y2={value*width/12} x1={0} x2={5} stroke="#DFDFDF" strokeWidth={2}/>)}
                        </g>
                        <g>
                            <text x={width/2-40} y={12} style={{
                                fontSize:'14px',
                                fill: '#999999'
                            }}>个性</text>
                            <text x={width/2-40} y={height-5} style={{
                                fontSize:'14px',
                                fill: '#999999'
                            }}>普遍</text>
                            <text x={0} y={height/2+20} style={{
                                fontSize:'14px',
                                fill: '#999999'
                            }}>消极</text>
                            <text x={width-30} y={height/2+20} style={{
                                fontSize:'14px',
                                fill: '#999999'
                            }}>积极</text>
                        </g>
                        {data.map(({x,y,r,type,name},index)=><Pointer key={index} index={index} x={width/2+x*width/200} y={height/2-y*height/200} r={r} name={name} type={type}/>)}
                    </g>
                </svg>
            </div>
        );
    }
}

class AddPointer extends Component{
    state={
        x:'0',
        y:'0',
        r:'10',
        type:'',
        name:''
    };
    handlerChangeX=(e)=>{
        this.setState({x:e.target.value});
    };
    handlerChangeY=(e)=>{
        this.setState({y:e.target.value});
    };
    handlerChangeR=(e)=>{
        this.setState({r:e.target.value});
    };
    handlerChangeName=(e)=>{
        const value=e.target.value||'';
        this.setState({name:value});
    };
    handlerChangeType=(e)=>{
        this.setState({type:e.target.value});
    };
    handlerClick=()=>{
        const {onAdd}=this.props,format=(value)=>{
            value=parseInt(value,10)||0;
            value=value>100?100:value;
            value=value<-100?-100:value;
            return value;
        };
        onAdd&&onAdd({
            x:format(this.state.x),
            y:format(this.state.y),
            r:Math.min(parseInt(this.state.r,10)||0,50),
            type:this.state.type||'#174279',
            name:this.state.name||'新点'
        });
        this.setState({
            name:''
        });
    };
    render(){
        return <div style={{padding:'10px',color:'#349393'}}>
            x:<input type="text" value={this.state.x} onChange={this.handlerChangeX}/>
            y:<input type="text" value={this.state.y} onChange={this.handlerChangeY}/>
            r:<input type="text" value={this.state.r} onChange={this.handlerChangeR}/>
            type:<select value={this.state.type} onChange={this.handlerChangeType}>
            <option value="">请选择</option>
            <option value="#174279">员工</option>
            <option value="#FCC426">公司</option>
            <option value="#2CADB1">福利</option>
            <option value="#F94F85">行业</option>
        </select>
            name:<input type="text" value={this.state.name} onChange={this.handlerChangeName}/>
            <button onClick={this.handlerClick}>添加点点</button>
        </div>
    }
}

export default ((WrappedComponent)=>class extends Component{
    state={
        isPreview:false,
        data:[]
    };
    handlerAdd=(pointer)=>{
        this.setState({
            data:[...this.state.data,pointer]
        },()=>{
            this.textarea.value=JSON.stringify(this.state.data,null,2);
        });
    };
    handlerClick=()=>{
        try {
            this.setState({
                data:JSON.parse(this.textarea.value)
            });
        }catch (e) {
            alert('同步失败');
            this.textarea.value=JSON.stringify(this.state.data,null,2);
        }
    };
    handlerPreview=()=>{
        this.setState({
            isPreview:!this.state.isPreview
        });
    };
    render(){
        return <div>
            <AddPointer onAdd={this.handlerAdd}/>
            <button onClick={this.handlerClick}>同步数据</button>
            <button onClick={this.handlerPreview}>预览{this.state.isPreview?'关':'开'}</button>
            <textarea ref={(el)=>this.textarea=el} style={{width:'100%',height:'200px'}} defaultValue={JSON.stringify(this.state.data,null,2)}/>
            {this.state.isPreview?<div style={{
                position:'absolute',
                width:'600px',
                height:'600px',
                top:'50%',
                left:'50%',
                transform:'translate(-50%,-50%)',
                background:'#fff',
                boxShadow:'1px 2px 10px rgba(0,0,0,0.5)'
            }}><WrappedComponent {...this.props} data={this.state.data}/></div>:null}
            <WrappedComponent {...this.props} data={this.state.data}/>
        </div>
    }
})(App);
