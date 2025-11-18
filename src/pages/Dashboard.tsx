// import { mockAlerts, mockStats, mockCameras } from "@/lib/mockData";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   Shield, 
//   Package, 
//   Activity, 
//   UserX, 
//   Zap,
//   Eye,
//   CheckCircle2,
//   AlertTriangle
// } from "lucide-react";

// export default function Dashboard() {
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical": return "bg-threat text-white tactical-glow";
//       case "high": return "bg-warning text-black warning-glow";
//       case "medium": return "bg-amber text-black";
//       default: return "bg-muted text-foreground";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active": return "text-threat";
//       case "investigating": return "text-warning";
//       case "monitoring": return "text-amber";
//       default: return "text-muted-foreground";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Command Dashboard</h1>
//         <p className="text-muted-foreground">Real-time surveillance and threat monitoring</p>
//       </div>

//       {/* Analytics Widgets */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//         <Card className="glass-panel border-border">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <Shield className="h-4 w-4 text-threat" />
//               Weapons Detected
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-threat">{mockStats.weaponsDetected}</div>
//             <p className="text-xs text-muted-foreground mt-1">Today</p>
//           </CardContent>
//         </Card>

//         <Card className="glass-panel border-border">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <Package className="h-4 w-4 text-warning" />
//               Suspicious Bags
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-warning">{mockStats.suspiciousBags}</div>
//             <p className="text-xs text-muted-foreground mt-1">Active</p>
//           </CardContent>
//         </Card>

//         <Card className="glass-panel border-border">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <Activity className="h-4 w-4 text-amber" />
//               Loitering Events
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-amber">{mockStats.loiteringEvents}</div>
//             <p className="text-xs text-muted-foreground mt-1">Last 24h</p>
//           </CardContent>
//         </Card>

//         <Card className="glass-panel border-border">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <UserX className="h-4 w-4 text-threat" />
//               Wanted Matches
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-threat">{mockStats.wantedMatches}</div>
//             <p className="text-xs text-muted-foreground mt-1">Confirmed</p>
//           </CardContent>
//         </Card>

//         <Card className="glass-panel border-border">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//               <Zap className="h-4 w-4 text-tactical" />
//               Anomalies
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-tactical">{mockStats.anomalies}</div>
//             <p className="text-xs text-muted-foreground mt-1">Detected</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Critical Alerts Section */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
//             <AlertTriangle className="h-5 w-5 text-threat" />
//             Critical Alerts
//           </h2>
//           <Button variant="outline" size="sm">View All</Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {mockAlerts.map((alert) => (
//             <Card key={alert.id} className="glass-panel border-border overflow-hidden">
//               <div className="flex gap-4 p-4">
//                 <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
//                   <img 
//                     src={alert.snapshot} 
//                     alt={alert.type}
//                     className="w-full h-full object-cover"
//                   />
//                   <Badge className={`absolute top-2 left-2 ${getSeverityColor(alert.severity)} text-[10px]`}>
//                     {alert.severity.toUpperCase()}
//                   </Badge>
//                 </div>

//                 <div className="flex-1 flex flex-col">
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <h3 className="font-semibold text-foreground">{alert.type}</h3>
//                       <p className="text-xs text-muted-foreground">{alert.camera}</p>
//                     </div>
//                     <span className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
//                       {alert.status.toUpperCase()}
//                     </span>
//                   </div>

//                   <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

//                   <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
//                     <span>{alert.location}</span>
//                     <span>•</span>
//                     <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
//                   </div>

//                   <div className="flex gap-2 mt-auto">
//                     <Button size="sm" variant="outline" className="flex-1">
//                       <Eye className="h-3 w-3 mr-1" />
//                       View
//                     </Button>
//                     <Button size="sm" variant="outline" className="flex-1">
//                       <CheckCircle2 className="h-3 w-3 mr-1" />
//                       Mark Safe
//                     </Button>
//                     <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
//                       Add to Evidence
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Live Camera Grid */}
//       <div>
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
//             {mockStats.activeCameras} / {mockStats.totalCameras} Online
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {mockCameras.map((camera) => (
//             <Card key={camera.id} className="glass-panel border-border overflow-hidden group cursor-pointer hover:border-threat transition-all">
//               <div className="relative aspect-video bg-muted">
//                 <img 
//                   src={camera.feed} 
//                   alt={camera.name}
//                   className="w-full h-full object-cover"
//                 />
//                 <Badge 
//                   className={`absolute top-2 right-2 text-[10px] ${
//                     camera.status === 'online' 
//                       ? 'bg-tactical text-white' 
//                       : 'bg-warning text-black'
//                   }`}
//                 >
//                   {camera.status === 'online' ? (
//                     <>
//                       <div className="h-1.5 w-1.5 rounded-full bg-white mr-1 animate-pulse-slow" />
//                       LIVE
//                     </>
//                   ) : 'MAINTENANCE'}
//                 </Badge>
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//               <CardContent className="p-3">
//                 <h3 className="font-semibold text-sm text-foreground">{camera.name}</h3>
//                 <p className="text-xs text-muted-foreground">{camera.location}</p>
//                 <p className="text-[10px] text-muted-foreground mt-1">{camera.id}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






import { mockAlerts, mockCameras } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-threat text-white tactical-glow";
      case "high": return "bg-warning text-black warning-glow";
      case "medium": return "bg-amber text-black";
      default: return "bg-muted text-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-threat";
      case "investigating": return "text-warning";
      case "monitoring": return "text-amber";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Command Dashboard</h1>
        <p className="text-muted-foreground">Real-time surveillance and threat monitoring</p>
      </div>

      {/* 🔥 Live Camera First */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Live Camera Feeds</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-tactical animate-pulse-slow" />
            {mockCameras.length} Cameras Active
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCameras.map((camera) => (
            <Card key={camera.id} className="glass-panel border-border overflow-hidden group cursor-pointer hover:border-threat transition-all">
              <div className="relative aspect-video bg-muted">
                <img 
                  src={camera.feed} 
                  alt={camera.name}
                  className="w-full h-full object-cover"
                />
                <Badge 
                  className={`absolute top-2 right-2 text-[10px] ${
                    camera.status === 'online' 
                      ? 'bg-tactical text-white' 
                      : 'bg-warning text-black'
                  }`}
                >
                  {camera.status === 'online' ? "LIVE" : "MAINTENANCE"}
                </Badge>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-sm text-foreground">{camera.name}</h3>
                <p className="text-xs text-muted-foreground">{camera.location}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{camera.id}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 🛑 Critical Alerts Below Live Feeds */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-threat" />
            Critical Alerts
          </h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-[1050px] mx-auto">
          {mockAlerts.map((alert) => (
            <Card key={alert.id} className="glass-panel border-border overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={alert.snapshot}
                    alt={alert.type}
                    className="w-full h-full object-cover"
                  />
                  <Badge className={`absolute top-2 left-2 ${getSeverityColor(alert.severity)} text-[10px]`}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{alert.type}</h3>
                      <p className="text-xs text-muted-foreground">{alert.camera}</p>
                    </div>
                    <span className={`text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span>{alert.location}</span>
                    <span>•</span>
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Mark Safe
                    </Button>
                    <Button size="sm" className="flex-1 bg-threat hover:bg-threat/90">
                      Add to Evidence
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

