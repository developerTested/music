import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
} from "@/components/cards/Card"

export default function DashBoard() {

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Admin Dashboard
                </h2>
            </div>


            <div className="grid grid-cols-4 gap-4">
                <Card>
                    <CardBody>
                        <CardHeader className="font-semibold">Album</CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            $1,250.00
                        </CardTitle>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardHeader className="font-semibold">Album</CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            $1,250.00
                        </CardTitle>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardHeader className="font-semibold">Artists</CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            $1,250.00
                        </CardTitle>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <CardHeader className="font-semibold">Total Users</CardHeader>
                        <CardTitle className="text-2xl font-semibold">
                            $1,250.0
                        </CardTitle>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
