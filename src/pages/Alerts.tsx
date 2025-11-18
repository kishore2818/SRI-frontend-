// import { mockAlerts } from "@/lib/mockData";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Search, Filter, Eye, Download } from "lucide-react";

// export default function Alerts() {
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "critical": return "bg-threat text-white";
//       case "high": return "bg-warning text-black";
//       case "medium": return "bg-amber text-black";
//       default: return "bg-muted text-foreground";
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground mb-2">Alert Management</h1>
//         <p className="text-muted-foreground">Monitor and respond to security threats</p>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input 
//             placeholder="Search alerts..."
//             className="pl-10 glass-panel border-border"
//           />
//         </div>
//         <Button variant="outline" className="gap-2">
//           <Filter className="h-4 w-4" />
//           Filters
//         </Button>
//       </div>

//       {/* Alerts List */}
//       <div className="space-y-3">
//         {mockAlerts.map((alert) => (
//           <Card key={alert.id} className="glass-panel border-border p-4">
//             <div className="flex gap-4">
//               <img 
//                 src={alert.snapshot}
//                 alt={alert.type}
//                 className="w-32 h-24 rounded-lg object-cover"
//               />
              
//               <div className="flex-1">
//                 <div className="flex items-start justify-between mb-2">
//                   <div>
//                     <Badge className={`${getSeverityColor(alert.severity)} mb-2`}>
//                       {alert.severity.toUpperCase()}
//                     </Badge>
//                     <h3 className="text-lg font-semibold text-foreground">{alert.type}</h3>
//                     <p className="text-sm text-muted-foreground">{alert.camera} • {alert.location}</p>
//                   </div>
//                   <div className="text-right text-sm text-muted-foreground">
//                     <div>{new Date(alert.timestamp).toLocaleTimeString()}</div>
//                     <div>{new Date(alert.timestamp).toLocaleDateString()}</div>
//                   </div>
//                 </div>
                
//                 <p className="text-sm text-foreground mb-3">{alert.description}</p>
                
//                 <div className="flex gap-2">
//                   <Button size="sm" variant="outline">
//                     <Eye className="h-3 w-3 mr-1" />
//                     View Details
//                   </Button>
//                   <Button size="sm" variant="outline">
//                     <Download className="h-3 w-3 mr-1" />
//                     Download
//                   </Button>
//                   <Button size="sm" className="bg-threat hover:bg-threat/90">
//                     Add to Case
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }














import { mockAlerts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Alerts() {
  const { toast } = useToast();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-threat text-white";
      case "high": return "bg-warning text-black";
      case "medium": return "bg-amber text-black";
      default: return "bg-muted text-foreground";
    }
  };

  const handleAddToCase = (alert: any) => {
    // Get existing cases from localStorage or initialize with mockCases
    const existingCases = JSON.parse(localStorage.getItem('cases') || '[]');
    
    // Create a new case from the alert
    const newCase = {
      id: `case-${Date.now()}`,
      title: `${alert.type} Alert - ${alert.location}`,
      priority: alert.severity,
      status: "active",
      officer: "Assigned Officer",
      evidenceCount: 1,
      notes: `Automatically created from alert: ${alert.description}`,
      created: new Date().toISOString(),
      alertSource: alert // Store the original alert data
    };

    // Add new case to existing cases
    const updatedCases = [newCase, ...existingCases];
    localStorage.setItem('cases', JSON.stringify(updatedCases));

    toast({
      title: "Alert added to new case",
      description: "A new case has been created with this alert.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Alert Management</h1>
        <p className="text-muted-foreground">Monitor and respond to security threats</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search alerts..."
            className="pl-10 glass-panel border-border"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Alerts Grid - 2 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockAlerts.map((alert) => (
          <Card key={alert.id} className="glass-panel border-border p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex gap-4">
              <img 
                src={alert.snapshot}
                alt={alert.type}
                className="w-24 h-20 rounded-lg object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getSeverityColor(alert.severity)} text-xs px-2 py-1`}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {alert.type}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {alert.camera} • {alert.location}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground shrink-0 ml-2">
                    <div className="font-medium">{new Date(alert.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    <div>{new Date(alert.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <p className="text-sm text-foreground mb-4 line-clamp-2">
                  {alert.description}
                </p>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-threat hover:bg-threat/90"
                    onClick={() => handleAddToCase(alert)}
                  >
                    Add to Mission
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}