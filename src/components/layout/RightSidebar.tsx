// import { mockAlerts, mockCameras, mockOperations } from "@/lib/mockData";
// import { Badge } from "@/components/ui/badge";
// import { AlertTriangle, Eye, CheckCircle2 } from "lucide-react";

// export const RightSidebar = () => {
//   const latestAlerts = mockAlerts.slice(0, 3);
//   const liveCamera = mockCameras[0];

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical": return "bg-threat text-white";
//       case "high": return "bg-warning text-black";
//       case "medium": return "bg-amber text-black";
//       default: return "bg-muted text-foreground";
//     }
//   };

//   return (
//     <aside className="w-80 border-l border-border bg-card overflow-y-auto">
//       {/* Live Camera Preview */}
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
//           <Badge variant="outline" className="text-xs">
//             <div className="h-2 w-2 rounded-full bg-tactical mr-1 animate-pulse-slow" />
//             LIVE
//           </Badge>
//         </div>
//         <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
//           <img 
//             src={liveCamera.feed} 
//             alt={liveCamera.name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute bottom-2 left-2 right-2 glass-panel rounded px-2 py-1">
//             <p className="text-xs font-medium text-foreground">{liveCamera.name}</p>
//             <p className="text-[10px] text-muted-foreground">{liveCamera.location}</p>
//           </div>
//         </div>
//       </div>

//       {/* Latest Alerts */}
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-sm font-semibold text-foreground">Latest Alerts</h3>
//           <AlertTriangle className="h-4 w-4 text-threat" />
//         </div>
//         <div className="space-y-2">
//           {latestAlerts.map((alert) => (
//             <div 
//               key={alert.id}
//               className="glass-panel rounded-lg p-3 hover:border-threat transition-colors cursor-pointer"
//             >
//               <div className="flex items-start justify-between mb-1">
//                 <Badge className={`${getSeverityColor(alert.severity)} text-[10px] px-2 py-0`}>
//                   {alert.type}
//                 </Badge>
//                 <span className="text-[10px] text-muted-foreground">
//                   {new Date(alert.timestamp).toLocaleTimeString('en-US', { 
//                     hour: '2-digit', 
//                     minute: '2-digit' 
//                   })}
//                 </span>
//               </div>
//               <p className="text-xs text-foreground font-medium mb-1">{alert.location}</p>
//               <p className="text-[10px] text-muted-foreground">{alert.camera}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Stats */}
//       {/* <div className="p-4 border-b border-border">
//         <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
//         <div className="grid grid-cols-2 gap-2">
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-threat">3</div>
//             <div className="text-[10px] text-muted-foreground">Critical</div>
//           </div>
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-warning">7</div>
//             <div className="text-[10px] text-muted-foreground">High Priority</div>
//           </div>
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-tactical">46</div>
//             <div className="text-[10px] text-muted-foreground">Cameras Online</div>
//           </div>
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-foreground">29</div>
//             <div className="text-[10px] text-muted-foreground">Total Alerts</div>
//           </div>
//         </div>
//       </div> */}

//       {/* Today's Operations */}
//       <div className="p-4">
//         <h3 className="text-sm font-semibold text-foreground mb-3">Today's Operations</h3>
//         <div className="space-y-2">
//           {mockOperations.map((op, idx) => (
//             <div 
//               key={idx}
//               className="flex items-start gap-2 text-xs"
//             >
//               <CheckCircle2 className="h-4 w-4 text-tactical mt-0.5 flex-shrink-0" />
//               <span className="text-muted-foreground">{op}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// };



// import { mockAlerts, mockCameras, mockOperations } from "@/lib/mockData";
// import { Badge } from "@/components/ui/badge";
// import { AlertTriangle, Eye, CheckCircle2 } from "lucide-react";

// export const RightSidebar = () => {
//   const latestAlerts = mockAlerts.slice(0, 3);
//   const liveCamera = mockCameras[0];

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical": return "bg-threat text-white";
//       case "high": return "bg-warning text-black";
//       case "medium": return "bg-amber text-black";
//       default: return "bg-muted text-foreground";
//     }
//   };

//   return (
//     <aside className="w-80 border-l border-border bg-card h-screen sticky top-0 overflow-y-auto">
//       {/* Live Camera Preview */}
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center justify-between mb-2">
//           <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
//           <Badge variant="outline" className="text-xs">
//             <div className="h-2 w-2 rounded-full bg-tactical mr-1 animate-pulse-slow" />
//             LIVE
//           </Badge>
//         </div>
//         <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
//           <img 
//             src={liveCamera.feed} 
//             alt={liveCamera.name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute bottom-2 left-2 right-2 glass-panel rounded px-2 py-1">
//             <p className="text-xs font-medium text-foreground">{liveCamera.name}</p>
//             <p className="text-[10px] text-muted-foreground">{liveCamera.location}</p>
//           </div>
//         </div>
//       </div>

//       {/* Latest Alerts */}
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-sm font-semibold text-foreground">Latest Alerts</h3>
//           <AlertTriangle className="h-4 w-4 text-threat" />
//         </div>
//         <div className="space-y-2">
//           {latestAlerts.map((alert) => (
//             <div 
//               key={alert.id}
//               className="glass-panel rounded-lg p-3 hover:border-threat transition-colors cursor-pointer"
//             >
//               <div className="flex items-start justify-between mb-1">
//                 <Badge className={`${getSeverityColor(alert.severity)} text-[10px] px-2 py-0`}>
//                   {alert.type}
//                 </Badge>
//                 <span className="text-[10px] text-muted-foreground">
//                   {new Date(alert.timestamp).toLocaleTimeString('en-US', { 
//                     hour: '2-digit', 
//                     minute: '2-digit' 
//                   })}
//                 </span>
//               </div>
//               <p className="text-xs text-foreground font-medium mb-1">{alert.location}</p>
//               <p className="text-[10px] text-muted-foreground">{alert.camera}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Stats */}
//       {/* <div className="p-4 border-b border-border">
//         <h3 className="text-sm font-semibold text-foreground mb-3">Quick Stats</h3>
//         <div className="grid grid-cols-2 gap-2">
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-threat">3</div>
//             <div className="text-[10px] text-muted-foreground">Critical</div>
//           </div>
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-warning">7</div>
//             <div className="text-[10px] text-muted-foreground">High Priority</div>
//           </div>
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-tactical">46</div>
//             <div className="text-[10px] text-muted-foreground">Cameras Online</div>
//           </div>
//           <div className="glass-panel rounded-lg p-3 text-center">
//             <div className="text-2xl font-bold text-foreground">29</div>
//             <div className="text-[10px] text-muted-foreground">Total Alerts</div>
//           </div>
//         </div>
//       </div> */}

//       {/* Today's Operations */}
//       <div className="p-4">
//         <h3 className="text-sm font-semibold text-foreground mb-3">Today's Operations</h3>
//         <div className="space-y-2">
//           {mockOperations.map((op, idx) => (
//             <div 
//               key={idx}
//               className="flex items-start gap-2 text-xs"
//             >
//               <CheckCircle2 className="h-4 w-4 text-tactical mt-0.5 flex-shrink-0" />
//               <span className="text-muted-foreground">{op}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// };








import { mockAlerts, mockCameras, mockOperations } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, CheckCircle2, Bot, Mic, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RightSidebar = () => {
  const latestAlerts = mockAlerts.slice(0, 3);
  const liveCamera = mockCameras[0];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-threat text-white";
      case "high": return "bg-warning text-black";
      case "medium": return "bg-amber text-black";
      default: return "bg-muted text-foreground";
    }
  };

  const handleVoiceInput = () => {
    // Voice input functionality
    console.log("Voice input activated");
    // Add your voice input logic here
  };

  const handleTextQuery = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle text query submission
    console.log("Text query submitted");
  };

  return (
    <aside className="w-80 border-l border-border bg-card">
      {/* Live Camera Preview */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-foreground">Live Feed</h3>
          <Badge variant="outline" className="text-xs">
            <div className="h-2 w-2 rounded-full bg-tactical mr-1 animate-pulse-slow" />
            LIVE
          </Badge>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          <img 
            src={liveCamera.feed} 
            alt={liveCamera.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 right-2 glass-panel rounded px-2 py-1">
            <p className="text-xs font-medium text-foreground">{liveCamera.name}</p>
            <p className="text-[10px] text-muted-foreground">{liveCamera.location}</p>
          </div>
        </div>
      </div>

      {/* Latest Alerts - Reduced Size */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Latest Alerts</h3>
          <AlertTriangle className="h-4 w-4 text-threat" />
        </div>
        <div className="space-y-2">
          {latestAlerts.map((alert) => (
            <div 
              key={alert.id}
              className="glass-panel rounded-lg p-2 hover:border-threat transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-1">
                <Badge className={`${getSeverityColor(alert.severity)} text-[10px] px-1.5 py-0 h-4`}>
                  {alert.severity}
                </Badge>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(alert.timestamp).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <p className="text-xs text-foreground font-medium mb-0.5 line-clamp-1">{alert.type}</p>
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-muted-foreground line-clamp-1">{alert.location}</p>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{alert.camera}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Bot Section - Centered and Larger */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col items-center text-center mb-4">
          {/* Large Centered Agent Bot with Blue Glow Pulse Effect */}
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75 scale-110"></div>
            <div className="relative bg-blue-500 rounded-full p-4 w-16 h-16 flex items-center justify-center">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security Agent</h3>
            <p className="text-sm text-muted-foreground">AI Assistant</p>
          </div>
        </div>
        
        {/* Query Input with Microphone and Arrow Button */}
        <form onSubmit={handleTextQuery} className="space-y-3">
          <div className="relative">
            <Input 
              placeholder="Ask me anything about security..."
              className="pr-20 glass-panel border-blue-300 focus:border-blue-500 text-sm"
            />
            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-blue-50"
                onClick={handleVoiceInput}
              >
                <Mic className="h-3 w-3 text-blue-500" />
              </Button>
              <Button
                type="submit"
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-blue-50"
              >
                <ArrowRight className="h-3 w-3 text-blue-500" />
              </Button>
            </div>
          </div>
        </form>
        
        {/* Help Text */}
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Ask about alerts, cameras, or security status
        </p>
      </div>

      {/* Today's Operations */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Today's Operations</h3>
        <div className="space-y-2">
          {mockOperations.map((op, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-2 text-xs"
            >
              <CheckCircle2 className="h-3 w-3 text-tactical mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground text-xs leading-tight">{op}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};







