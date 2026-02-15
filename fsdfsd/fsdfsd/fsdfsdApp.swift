//
//  fsdfsdApp.swift
//  fsdfsd
//
//  Created by Mauricio Jardim on 01/02/2026.
//

import SwiftUI
import CoreData

@main
struct fsdfsdApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
