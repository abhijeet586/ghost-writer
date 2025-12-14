import {useState} from 'react';// react hook that allows component to remember things(else variables reset every time component updates)
import {motion} from 'framer-motion';
import DotGrid from './DotGrid';
import ShinyText from './ShinyText';
import ReactMarkdown from 'react-markdown';
export default function App(){
  const [topic,setTopic]=useState('');//this will hold what user types starting with empty string
  const [blog , setBlog]=useState('');//this will hold our result blog
  const [loading,setLoading] = useState(false);//tracks if the app is currently thinking  so we can show a spinner or disable button
  const [copyStatus, setCopyStatus] = useState("Copy");
  //core function connecting frontend to backend
  const generateBlog = async() =>{//async: keyword  that tells javascript that this function will perform tasks that take time (like fetching data across the internet) and it shouldn't freeze the screen while waiting
    if(!topic) return;// safety check if user hasnt given anything fn stops
    setLoading(true);//starting the process....flip loading true
    //netwrork req
    try{//attempting to connect to server (if anything goes wrong goes to catch error block) 
      const response =await fetch('https://ghost-writer-api.onrender.com/api/generate',{//this sends signal to backend 
        method:'POST',//we are sending data to server not just asking to read
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({topic}),// we take topic from user.. convert to JSON string and ship it back to the backend
      })//await:the code pauses here.. it waits for the server to finish generating the blog and send a response back
      //handling data
      const data = await response.json();//once response comes we convert it to json
      setBlog(data.content || data.error);//we update blog state with result or error
    }catch(error){
      setBlog("Failed to connect to server...");
    }
    setLoading(false);//return loading switch back to false
  };
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blog);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus("Copy"), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return(
    //UI is here
    <div className="relative w-full min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0"> {/*layer 1 : background from react-bits components*/ }
        <DotGrid
          dotSize={6}           
          gap={40}              
          baseColor="#222222"   
          activeColor="#6d28d9" 
          proximity={200}       
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
          className="w-full h-full opacity-60" // slight transparency for blending
        />
      </div>
          {/*layer2 : content */}
      <div className="relative z-10 flex flex-col items-center p-10 min-h-screen">
        <h1 className="font-sekuya text-5xl md:text-8xl font-bold tracking-wider mb-8 cursor-pointer selection:bg-purple-500">
          <ShinyText 
            text="GHOSTWRITER" 
            disabled={false} 
            speed={3} 
            className="custom-shiny-text" 
          />
        </h1>
        <p className=" font-sekuya text-gray-400 mb-10 text-lg text-center max-w-lg ">
          Your AI-powered blog writer.
        </p>
        {/* input section */}
        <div className="relative w-full max-w-3xl mx-auto mb-16 group z-20">
          
          {/*glowing aura */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-lg"></div>
          
          {/*input container with glass effect*/}
      
          <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 transition-all focus-within:border-purple-500/50 focus-within:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            
            {/*search icon*/}
            <div className="pl-4 pr-2 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>

            {/*input field*/}
            <input 
              type="text"
              placeholder="What legend shall we write today?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generateBlog()}
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-4 outline-none font-sans text-xl tracking-wide"
            />

            {/*generate button*/}
            <button 
              onClick={generateBlog}
              disabled={loading}
              className="relative px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold tracking-wider hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden border border-white/20"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                {loading ? 'Summoning...' : 'Generate'}
              </span>
            </button>
          </div>
          
        </div>
        {/* result section having glass card in darker shade*/}
        {blog && (
          <motion.div 
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl relative z-20 pb-20 px-4"
          >
            {/*the glass card container */}
            <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl overflow-hidden group">
              
              {/*copy button*/}
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/5 text-gray-300 text-sm font-bold py-2 px-4 rounded-lg transition-all active:scale-95 z-30"
              >
                {copyStatus === "Copy" ? (
                  //copy icon
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                ) : (
                  //checkmark icon
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                )}
                <span className={copyStatus === "Copied!" ? "text-green-500" : ""}>
                  {copyStatus}
                </span>
              </button>


              {/*top purple shine line */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
              
              {/*the blog */}
              {/*the blog content area */}
              <div className="text-gray-300 leading-loose text-lg font-light">
                
                <ReactMarkdown
                  components={{
                    //styling my  headers with sekuya 
                    h1: ({node, ...props}) => <h1 className="font-sekuya text-4xl md:text-5xl text-purple-200 mt-8 mb-4 leading-tight" {...props} />,
                    h2: ({node, ...props}) => <h2 className="font-sekuya text-3xl md:text-4xl text-purple-200 mt-8 mb-4 leading-tight" {...props} />,
                    h3: ({node, ...props}) => <h3 className="font-sekuya text-2xl md:text-3xl text-purple-300 mt-6 mb-3" {...props} />,
                    
                    //styling my bold text to pop
                    strong: ({node, ...props}) => <strong className="text-white font-bold tracking-wide" {...props} />,
                    
                    //styling lists so they look clean
                    ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-6 space-y-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-6 space-y-2" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    
                    //styling paragraphs to have breathing room
                    p: ({node, ...props}) => <p className="mb-6" {...props} />,
                    
                    //styling code blocks (just in case AI writes code)
                    code: ({node, ...props}) => <code className="bg-white/10 rounded px-1.5 py-0.5 text-purple-200 font-mono text-sm" {...props} />
                  }}
                >
                  {blog}
                </ReactMarkdown>

              </div>

            </div>
          </motion.div>
        )}

        {/* footer*/}
      <footer className="w-full mt-20 py-8 border-t border-white/10 bg-black/20 backdrop-blur-md z-20 relative rounded-lg">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6 px-4">
          
          {/*social links */}
          <div className="flex gap-8">
            

            <a 
              href="https://github.com/abhijeet586" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>


            <a 
              href="https://instagram.com/senapatiabhijeet55" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative p-2 text-gray-400 hover:text-pink-500 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-pink-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>

          
            <a 
              href="mailto:senapatiabhijeet55@gmail.com" 
              className="group relative p-2 text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-blue-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>

          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm tracking-wide">
              Designed & Built by
            </p>
            <p className="font-sekuya text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mt-1">
              Abhijeet Senapati
            </p>
            <p className="text-gray-600 text-xs mt-2">
              © 2025 All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>
      </div>
    </div>
  )

}