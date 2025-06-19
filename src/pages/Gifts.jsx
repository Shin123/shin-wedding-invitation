import { motion } from 'framer-motion';
import {
    Gift
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Gifts() {
    const [hasAnimated, setHasAnimated] = useState(false);

    // Set animation to run once on component mount
    useEffect(() => {
        setHasAnimated(true);
    }, []);

    return (<>
        <section id="gifts" className="min-h-screen relative overflow-hidden">
            <div className="container mx-auto px-4 py-10 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4"
                >

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Gifts
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={hasAnimated ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <Gift className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>

                    {/* Message Container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={hasAnimated ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                        className="space-y-4 max-w-md mx-auto"
                    >

                        {/* Main Message */}
                        <p className="text-gray-600 leading-relaxed">
                            Món quà lớn nhất là sự hiện diện của bạn trong ngày vui của vợ chồng mình. Tuy nhiên, nếu bạn muốn dành tặng điều gì đó, vợ chồng mình sẽ rất hạnh phúc và trân quý mọi tấm lòng
                        </p>

                    </motion.div>

                    {/* Optional: Additional Decorative Element */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={hasAnimated ? { scale: 1 } : {}}
                        transition={{ delay: 0.6 }}
                        className="flex items-center justify-center gap-3 pt-4"
                    >
                        <div className="h-px w-8 bg-rose-200/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-300" />
                        <div className="h-px w-8 bg-rose-200/50" />
                    </motion.div>
                </motion.div>

                {/* Bank Accounts Grid */}
                <div className=" gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 * 2 + 0.7 }}
                        className="flex justify-center items-center">
                        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-auto">
                            <div className="flex justify-center">
                                <img
                                    src="/images/qrBank.png"
                                    alt="QR Code"
                                    className="rounded-xl object-cover border border-gray-200 shadow-sm transition-transform"
                                />
                            </div>
                            <div className="mt-6 text-center space-y-1">
                                <p className="text-lg font-semibold text-gray-800">Trương Lê Phụng Thư</p>
                                <p className="text-md text-gray-600 tracking-wide">Số tài khoản: <span className="font-medium">101882998878</span></p>
                                <p className="text-md text-gray-600">Ngân hàng VietinBank</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    </>)
}